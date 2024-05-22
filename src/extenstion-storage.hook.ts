import { useEffect, useMemo, useState } from 'react';

// Custom hook for extension storage and messaging
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
        // Fetch stored data when component mounts
        storage?.get(key).then((result) => {
            setStoredData(result[key] as T); // Assuming myData contains the stored array
        });

        const storageChangeListener = (changes: { [key: string]: browser.storage.StorageChange | chrome.storage.StorageChange; }) => {
            setStoredData(changes[key].newValue as T); // Assuming myData contains the stored array
        };

        // Listen for changes in storage
        storage?.onChanged.addListener(storageChangeListener);

        return () => {
            storage?.onChanged.removeListener(storageChangeListener);
        };
    }, [key, storage]);

    const sendToStorage = (data: T) => {

        // Save data to storage
        storage?.set({ [key]: data });
    };

    return { storedData, sendToStorage };
};

export default useExtensionStorage;
