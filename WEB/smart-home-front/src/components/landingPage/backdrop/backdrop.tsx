
import React from 'react'
import styles from './backdrop.module.css'

type Props = {
    showBackdrop: boolean;
    onClick: () => void;
}

export const Backdrop: React.FC<Props> = ({ showBackdrop, onClick }) => {

    return (
        showBackdrop ? <div className={styles.Backdrop} onClick={onClick}></div> : null

    )
}