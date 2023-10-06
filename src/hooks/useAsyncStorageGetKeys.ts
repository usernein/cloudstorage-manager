import { useWebApp } from "@vkruglikov/react-telegram-web-app";

export const useAsyncStorageGetKeys = (
  WebApp: ReturnType<typeof useWebApp>,
) => {
  console.log("useAsyncStorageGetKeys");
  return () => {
    console.log("useAsyncStorageGetKeys > the function inside");
    return new Promise<string[]>((resolve) => {
      console.log("useAsyncStorageGetKeys > the function inside > new Promise");
      try {
        WebApp.CloudStorage.getKeys((err: Error | null, keys: string[]) => {
          if (err) {
            return resolve(["abc", "def", "ghi"]);
            // return reject(err);
          }
          resolve(keys);
        });
      } catch {
        resolve(["abc", "def", "ghi"]);
      }
    });
  };
};
