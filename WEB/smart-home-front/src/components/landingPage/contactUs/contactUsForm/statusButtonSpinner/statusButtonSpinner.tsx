import React, { ReactElement, ReactEventHandler } from "react";

import styles from './statusButtonSpinner.module.css'

interface Props {
    initial: boolean;
    sending: boolean;
    susscess: boolean;
}

export const StatusButtonSpinner: React.FC<Props> = ({ initial, sending, susscess }): JSX.Element => {

    let returnItem;
    if (initial)
        returnItem = <p style={{ margin: 0 }}>Contact us!</p>;
    else {

        if (sending) {
            returnItem =
                <div className={styles.loader}>
                </div>
        } else {
            if (susscess) {
                returnItem =
                    <div className={styles.loader}>
                    </div>
            } else {
                returnItem =
                    <div className={styles.loader}>
                    </div>
            }
        }
    }

    return (returnItem)
}