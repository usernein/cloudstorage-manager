import { useWebApp } from "@vkruglikov/react-telegram-web-app";

export const useAsyncStorageGetSingleItem = (
  WebApp: ReturnType<typeof useWebApp>,
) => {
  return (key: string) => {
    return new Promise<string>((resolve, reject) => {
      WebApp.CloudStorage.getItem(key, (err: Error | null, data: string) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  };
};
