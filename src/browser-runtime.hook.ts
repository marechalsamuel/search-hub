import { useEffect, useState } from 'react';

const DEBUG_FLAG = false;
const debug = DEBUG_FLAG ? console.log : () => {};

type Sender = browser.runtime.MessageSender | chrome.runtime.MessageSender
type SendResponse<T> = (onfulfilled: Response<T>) => void

type Message<T> = T
type Response<T> = {
    __?: T
    received?: boolean
}
type ResponseCallback<T> = (response: Response<T>) => void
//sendMessage<M = any, R = any>(message: M, responseCallback: (response: R) => void): void;

// Custom hook for messaging
const useBrowserRuntime = <T>() => {
    const [message, setMessage] = useState<Message<T>>();

    // Wrapper function to send messages based on the browser API
    const send = (tabId: number, message: Message<T>, callback: ResponseCallback<T>) => {
        debug("send", message);
        if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.sendMessage) {
            // Chrome
            chrome.tabs.sendMessage(tabId, message, callback);
        } else if (typeof browser !== 'undefined' && browser.tabs && browser.tabs.sendMessage) {
            // Firefox
            browser.tabs.sendMessage(tabId, message).then(callback);
        } else {
            console.error('Unsupported browser for sendMessage.');
        }
    };

    // Wrapper function to receive messages based on the browser API
    const listen = (callback: (message: Message<T>, _: Sender, __: SendResponse<T>) => void) => {
        debug("listen");
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
            debug("Chrome");
            chrome.runtime.onMessage.addListener(callback);
        } else if (typeof browser !== 'undefined' && browser.runtime && browser.runtime.onMessage) {
            debug("Firefox");
            browser.runtime.onMessage.addListener(callback);
        } else {
            console.error('Unsupported browser for onMessage.');
        }
    };

    useEffect(() => {
        debug("Handle incoming messages");
        const messageListener = (message: Message<T>, _: Sender, sendResponse: SendResponse<T>) => {
            debug("messageListener", message);
            setMessage(message);
            // Optionally, send a response back to the background script
            sendResponse({ received: true });
        };

        debug("Start listening for messages");
        listen(messageListener);

        return () => {
            debug("Clean up listener on unmount");
            if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
                chrome.runtime.onMessage.removeListener(messageListener);
            } else if (typeof browser !== 'undefined' && browser.runtime && browser.runtime.onMessage) {
                browser.runtime.onMessage.removeListener(messageListener);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run only once on component mount

    const getTabs = () => {
        const query = {
            currentWindow: true,
            active: true,
        }
        if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
            debug("Chrome");
            return chrome.tabs.query(query)
        } else if (typeof browser !== 'undefined' && browser.tabs && browser.tabs.query) {
            debug("Firefox");
            return browser.tabs.query(query)
        } else {
            console.error('Unsupported browser for onMessage.');
        }
    }

    // Function to send messages
    const sendMessage = (message: Message<T>, callback: ResponseCallback<T>) => {
        getTabs()?.then((tabs) => {
            for (const {id: tabId} of tabs) {
                if (tabId !== undefined) send(tabId, message, callback)
            }
        })
    };

    return { message, sendMessage };
};

export default useBrowserRuntime;