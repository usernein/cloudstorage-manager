import React from "react";
import styles from "./EmptyStorageAlert.module.scss";
import clsx from "clsx";
import {StoredItemActionNew} from "../StoredItemActionNew/StoredItemActionNew.tsx";

export type EmptyStorageAlertProps = {
    className?: string;
};
export const EmptyStorageAlert: React.FC<EmptyStorageAlertProps> = ({
                                                                        className,
                                                                    }) => {
    return (
        <div className={clsx(styles.EmptyStorageAlert, className)}>
            <span>No items in CloudStorage yet.</span>
            <StoredItemActionNew/>
        </div>
    );
};
