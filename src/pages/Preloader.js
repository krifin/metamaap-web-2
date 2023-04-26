import React, { useEffect, useRef, useState } from 'react'
import './Preloader.css'

const Preloader = () => {
    const videoRef = useRef(null);

    // loader thw preloader for 5 seconds then start the video above the loading screen and when the video is done go to the home page
    useEffect(() => {
        const timer = setTimeout(() => {
            document.querySelector('.preloader').classList.add('hide-preloader')
            videoRef.current.classList.add('show-video')
            videoRef.current.classList.remove('hide-video')
            videoRef.current.play()
            videoRef.current.addEventListener('ended', () => {
                document.querySelector('.video-container').classList.add('hide-video')
                document.querySelector('.video-container').classList.remove('show-video')
                window.location.href = '/home'
            })
        }, 2000)
        return () => clearTimeout(timer)
    }, [])
    return (
        <div>
            <div className="preloader">
                <div className="loader-circle">
                    <p className="loader-content">LOADING</p>
                    <div className="loader-line-mask">
                        <div className="loader-line"></div>
                    </div>
                </div>
            </div>
            <video ref={videoRef} className="video-container hide-video" autoPlay muted>
                <source src="/assets/videos/preloader_video.mp4" type="video/mp4" />
            </video>
        </div>

    )
}

export default Preloader