import React, { useEffect, useRef, useState } from 'react'
import './Preloader.css'

const Preloader = () => {
    const videoRef = useRef(null);

    // loader thw preloader for 5 seconds then start the video above the loading screen and when the video is done go to the home page
    useEffect(() => {
        if (videoRef.current === null) return
        const timer = setTimeout(async () => {
            document.querySelector('.preloader').classList.add('hide-preloader')
            videoRef.current.classList.add('show-video')
            videoRef.current.classList.remove('hide-video')
            videoRef.current.play()
            videoRef.current.addEventListener('ended', () => {
                videoRef.current.classList.add('hide-video')
                videoRef.current.classList.remove('show-video')
                window.location.href = '/home'
            })
        }, 2000)
        return () => clearTimeout(timer)
    }, [videoRef])
    return (
        <div>
            <div className="preloader">
                <div className="preloader-circle">
                    <p className="preloader-content">LOADING</p>
                    <div className="preloader-line-mask">
                        <div className="preloader-line"></div>
                    </div>
                </div>
            </div>
            <video ref={videoRef} className="preloader-video-container hide-video" autoPlay muted>
                <source src="/assets/videos/preloader_video.mp4" type="video/mp4" />
            </video>
        </div>

    )
}

export default Preloader