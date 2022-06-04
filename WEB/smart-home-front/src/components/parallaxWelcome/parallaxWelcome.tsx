import React, { ReactElement, useEffect, useState } from 'react'
import { ParallaxBanner, Parallax } from 'react-scroll-parallax';
import { useRef } from 'react';
import styles from './parallaxWelcome.module.css'
import { Background } from './background/background'
import { Navbar } from '../navbar/navbar';
import { BannerLayer } from 'react-scroll-parallax/dist/components/ParallaxBanner/types';
import { ParallaxText } from './parallaxText/parallaxText';

export const ParallaxWelcome: React.FC = () => {


    return (
        <div style={{
            backgroundColor: "#d4cccc"
        }}>
            <Navbar />

            <ParallaxText />
            <div style={{ 'height': '1000px' }}>

            </div>
        </div >
    )
}