import { useWebApp } from "@vkruglikov/react-telegram-web-app";

export const useAsyncStorageSetItem = (
  WebApp: ReturnType<typeof useWebApp>,
) => {
  return (key: string, value: string) => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.CloudStorage.setItem(key, value, (err: Error | null) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  };
};
