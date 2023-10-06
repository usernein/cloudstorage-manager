import { createEvent } from "react-event-hook";

export type StorageItemPayload = {
  key: string;
};

export type StorageItemUpdatedPayload = StorageItemPayload & {
  value: string;
};

export const { useStorageRefreshAllItemsListener, emitStorageRefreshAllItems } =
  createEvent("storage-refresh-all-items")();
export const { useStorageItemDeletedListener, emitStorageItemDeleted } =
  createEvent("storage-item-deleted")<StorageItemPayload>();
export const { useStorageItemUpdatedListener, emitStorageItemUpdated } =
  createEvent("storage-item-updated")<StorageItemUpdatedPayload>();
