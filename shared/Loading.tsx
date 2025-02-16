'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Loading: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    function preloader() {
      setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
          preloader.style.transition = 'opacity 0.5s ease';
          preloader.style.opacity = '0';
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 500);
        }
      }, 2000);
    }
    return () => {
      preloader();
    };
  }, []);

  if (!visible) return null;
  
  return (
    <div
      id="preloader"
      className="fixed inset-0 flex items-center justify-center bg-[#0D0D0D] z-[9999999]"
    >
      <div className="relative flex items-center h-10">
        <div className="absolute -top-8 left-0 flex">
          <Image
            className="animate-spin"
            src="/assets/film.png"
            alt="Film Reel"
            width={40}
            height={40}
          />
          <Image
            className="animate-spin"
            src="/assets/film.png"
            alt="Film Reel"
            width={40}
            height={40}
          />
        </div>
        <Image
          className=""
          src="/assets/camera.png"
          alt="Camera"
          width={65}
          height={65}
        />
      </div>
    </div>
  );
};

export default Loading;
