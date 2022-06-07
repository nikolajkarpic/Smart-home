import styles from './initialLanding.module.css'

export const InitialLadning = () => {
    return (
        <div style={{
            backgroundColor: "transparent",
            filter: 'alpha(opacity=2)',
            height: '100vh',
            overflowX: 'hidden'
        }}>
            <div className={styles.backgroundLayerRectTop}></div>
            <div className={styles.backgroundLayerTriangle}>
                <div className={styles.mainWindowRow}>
                    <div className={styles.smartText}>

                        smart
                    </div>
                    <div className={styles.wayToText}>
                        way to
                    </div>
                </div>
                <div className={styles.mainWindowRow}>
                    <div className={styles.autoYourText}>
                        automate your

                    </div>
                    <div className={styles.homeText} >
                        Home

                    </div>
                </div>
            </div>
            <div className={styles.backgroundLayerRectBottom}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque id voluptates enim? Similique delectus voluptates saepe vel molestias adipisci porro?</p>
            </div>
        </div >
    )
}