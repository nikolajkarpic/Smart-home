import React, { Children, ReactChild } from 'react'
import styles from './modal.module.css'

type Props = {
    show: boolean;
    children?: React.ReactNode;

}


export const Modal: React.FC<Props> = ({ children, show }) => {
    return (<div className={styles.Modal}
        style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0'
        }}>
        {children}
    </div>)
}