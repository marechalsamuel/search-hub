import { useEffect, useMemo, useState } from 'react';

type StorageChange = browser.storage.StorageChange | chrome.storage.StorageChange
const useExtensionStorage = <T>(key: string) => {
    const [storedData, setStoredData] = useState<T | null>(null);
    const storage = useMemo(() => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            // Chrome
            return chrome.storage.local;
        } else if (typeof browser !== 'undefined' && browser.storage) {
            // Firefox
            return browser.storage.local;
        } else {
            console.error('Unsupported browser for sendMessage.');
        }
    }, []);

    useEffect(() => {
        storage?.get(key).then((result) => {
            setStoredData(result[key]);
        });

        const storageChangeListener = (changes: { [key: string]: StorageChange }) => {
            if (!changes[key]) return;
            setStoredData(changes[key].newValue);
        };

        storage?.onChanged.addListener(storageChangeListener);

        return () => {
            storage?.onChanged.removeListener(storageChangeListener);
        };
    }, [key, setStoredData, storage]);

    const sendToStorage = (data: T) => {
        storage?.set({ [key]: data });
    };

    return { storedData, sendToStorage };
};

export default useExtensionStorage;
