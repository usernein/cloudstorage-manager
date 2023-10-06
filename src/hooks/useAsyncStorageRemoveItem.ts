import { useWebApp } from "@vkruglikov/react-telegram-web-app";

export const useAsyncStorageRemoveItem = (
  WebApp: ReturnType<typeof useWebApp>,
) => {
  return (key: string) => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.CloudStorage.removeItem(key, (err: Error | null) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  };
};
