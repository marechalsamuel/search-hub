import { useEffect, useState } from "react";
import { storage } from "./storage";

type StorageChange =
  | browser.storage.StorageChange
  | chrome.storage.StorageChange;
const useExtensionStorage = <T>(key: string, defaultValue: T) => {
  const [storedData, setStoredData] = useState<T>(defaultValue);
  useEffect(() => {
    storage?.local.get(key).then((result) => {
      setStoredData(result[key]);
    });

    const storageChangeListener = (changes: {
      [key: string]: StorageChange;
    }) => {
      if (!changes[key]) return;
      setStoredData(changes[key].newValue);
    };

    storage?.local.onChanged.addListener(storageChangeListener);

    return () => {
      storage?.local.onChanged.removeListener(storageChangeListener);
    };
  }, [key, setStoredData]);

  const sendToStorage = (data: T) => {
    storage?.local.set({ [key]: data });
  };

  return { storedData, sendToStorage };
};

export default useExtensionStorage;
