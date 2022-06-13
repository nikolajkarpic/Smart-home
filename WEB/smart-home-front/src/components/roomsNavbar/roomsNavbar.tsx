import React from "react"
import styles from './roomsNavbar.module.css'


const RoomsNavbar: React.FC<{}> = () => {

    return (
        <div className={styles.navbar}>
            <div className={styles.rooms}>
                <div className={styles.allDiv}>
                    all
                </div>
                <div >

                    kitchen
                    bedroom
                    bedroom 2
                    livving room
                </div>
            </div>
            add rooms
        </div>
    )
}

export default RoomsNavbar;