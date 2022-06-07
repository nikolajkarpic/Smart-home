import { jsx } from "@emotion/react";
import { title } from "process";
import React, { FC } from "react"

import styles from './offeredService.module.css'

interface Props {
    title: string;
    subTitle: string;
    text: string;
    image: JSX.Element;
    inverse: boolean;
}

export const OfferedService: FC<Props> = ({ title, subTitle, text, image, inverse }) => {
    let elemment;

    if (!inverse) {
        elemment =
            <div className={styles.card} >
                <div className={styles.textDiv}>
                    <div>
                        <p>{title}</p>
                        <h1>{subTitle}</h1>
                    </div>
                    <p>{text}</p>
                </div>
                <div className={styles.image}>
                    {image}
                </div>
            </div>
    } else {
        elemment =
            <div className={styles.card} >
                <div className={styles.image}>
                    {image}
                </div>
                <div className={styles.textDiv}>
                    <div>
                        <p>{title}</p>
                        <h1>{subTitle}</h1>
                    </div>
                    <p>{text}</p>
                </div>
            </div>
    }

    return (
        elemment
    );
}