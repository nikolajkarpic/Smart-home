import React, { ReactElement, useEffect, useState } from 'react'
import { ParallaxBanner, Parallax } from 'react-scroll-parallax';
import { useRef } from 'react';
import styles from './parallaxWelcome.module.css'
import { Background } from './background/background'
import { Navbar } from '../navbar/navbar';
import { BannerLayer } from 'react-scroll-parallax/dist/components/ParallaxBanner/types';
import { ParallaxText } from './parallaxText/parallaxText';
import { ContactMe } from './contactMe/contactMe';

export const ParallaxWelcome: React.FC = () => {


    return (
        // <div style={{
        //     backgroundColor: "#d4cccc",
        //     height: '100vh',
        //     width: '100vw'
        // }}>
        // <Navbar />

        <ParallaxText />

    )
}