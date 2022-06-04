import React from "react"
import { Parallax, ParallaxBanner } from "react-scroll-parallax"
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types"
import useWindowDimensions from "../../../hooks/windowSize/windowsSize"
import { Background } from "../background/background"
import styles from './parallaxText.module.css'

export const ParallaxText: React.FC = () => {

    const { height, width } = useWindowDimensions();
    //937
    const backGround: BannerLayer = {
        children: <Background />,
        translateY: ["20%", '-20%']
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
            className={styles.mainWindow}
        >
            <Parallax className={styles.mainWindowRow}>
                <Parallax style={{ width: '60%', height: '100%' }} translateY={['250%', '-200%']} startScroll={0} className={styles.smartParalax}>

                    smart
                </Parallax>
                <Parallax translateY={['2170%', '-1750%']} className={styles.wayToParallax}>
                    way to
                </Parallax>
            </Parallax>
            <Parallax className={styles.mainWindowRow}>
                <Parallax style={{ width: '60%' }} translateY={['1290%', '-1750%']} className={styles.autoYourParallax}>
                    automate your

                </Parallax>
                <Parallax style={{ width: '40%' }} translateY={['520%', '-750%']} className={styles.homeParallax} >
                    Home

                </Parallax>
            </Parallax>

            <Parallax translateY={['1600%', '-1000%']} className={styles.flashyWordsContainerColumn}>
                <h3 className={styles.flasyWord}>“The value of an idea lies in the using of it.“</h3>
            </Parallax>
            <Parallax translateY={['100%', '-1300%']} className={styles.flashyWordsContainerColumn}>
                <h3 className={styles.flasyWord}>“The best way to predict the future is to create it.“</h3>
            </Parallax>
        </ParallaxBanner >
    )
}