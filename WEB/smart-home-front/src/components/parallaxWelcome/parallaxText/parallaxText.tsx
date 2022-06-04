import React from "react"
import { Parallax, ParallaxBanner } from "react-scroll-parallax"
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types"
import useWindowDimensions from "../../../hooks/windowSize/windowsSize"
import { Background } from "../background/background"
import styles from './parallaxText.module.css'

export const ParallaxText = () => {

    const { height, width } = useWindowDimensions();
    //937
    const backGround: BannerLayer = {
        children: <Background />,
        translateY: [55, -50],
        speed: -20
    }


    return (
        <ParallaxBanner
            layers={[
                backGround,
                // {
                //     children: <h1 className={styles.smartText}> smart</h1>,
                //     speed: 1,
                // }
            ]}
            style={{ aspectRatio: '1 / 1' }}
        >
            <Parallax translateY={[40, -20]} className={styles.mainWindow}>
                <div className={styles.mainWindowRow}>
                    <Parallax translateY={[80, -300]} style={{ width: '60%' }} className={styles.smartParalax}>

                        <h3 className={styles.smartText}>smart</h3>
                    </Parallax>
                    <Parallax translateY={[1340, -1500]} className={styles.wayToParallax}>
                        <h3 className={styles.wayToText}>way to</h3>
                    </Parallax>
                </div>
                <div className={styles.mainWindowRow}>
                    <Parallax translateY={[550, -1500]} style={{ width: '60%' }} className={styles.autoYourParallaxs}>
                        <h3 style={{ textAlign: 'right' }} className={styles.autoYourText}>automate your</h3>

                    </Parallax>
                    <Parallax translateY={[100, -680]} style={{ width: '40%' }} className={styles.homeParallax} >
                        <h3 className={styles.homeText}>Home</h3>

                    </Parallax>
                </div>
            </Parallax>

            <Parallax translateY={[1600, 0]} className={styles.flashyWordsContainerColumn}>
                <h3 className={styles.flasyWord}>“The value of an idea lies in the using of it.“</h3>
            </Parallax>
            <Parallax translateY={[900, -210]} className={styles.flashyWordsContainerColumn}>
                <h3 className={styles.flasyWord}>“The best way to predict the future is to create it.“</h3>
            </Parallax>
        </ParallaxBanner >
    )
}