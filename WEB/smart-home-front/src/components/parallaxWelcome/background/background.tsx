import React from 'react'
import styles from './background.module.css'

type Props = {}

export const Background = (props: Props) => {
    return (
        <div style={{
            backgroundColor: "#d4cccc"
        }}>
            {/* <div style={{ 'background': '#d4cccc', 'width': '100%', 'height': '200px' }}></div> */}
            <div className={styles.backgroundLayerTriangle}></div>
            <div className={styles.backgroundLayerRect}></div>
        </div >
    )
}