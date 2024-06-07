export const FAVICON_DEFAULT_SIZE = 24;

export const getFavicon = (url: string, size = FAVICON_DEFAULT_SIZE) => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  } catch (e) {
    return;
  }
};