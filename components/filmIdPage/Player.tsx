'use client';

import React from 'react';

interface Props {
  id: number;
  url: string;
}

const Player: React.FC<Props> = ({ id, url }) => {
  return (
    <div className="relative w-full h-[750px] rounded-md">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat blur-sm"
        style={{
          backgroundImage: `url(${url})`,
        }}
      ></div>

      <div className="absolute inset-0 rounded-sm overflow-hidden">
        {/* <iframe
          className="w-[1320px] h-[950px] border-0 p-10 rounded-sm m-auto"
          loading="lazy"
          src={`${process.env.NEXT_PUBLIC_PLAYER_SOURCE}/${id}`}
          contextMenu="12"
          security=""
          allowFullScreen
        /> */}
        <iframe
          id="ipl"
          title="null"
          className="w-[1320px] h-[735px] border-0 p-10 rounded-sm m-auto"
          data-src={`/embed/kp-${id}`}
          allowFullScreen
          loading="lazy"
          src={`http://zagonka19.zagonkop.gb.net/embed/kp-${id}`}
        />
        {/* <iframe
          id="ipl"
          title="Особо опасный пассажир смотреть онлайн бесплатно фильм (2025)"
          className="w-[1320px] h-[735px] border-0 p-10 rounded-sm m-auto"
          data-src={`/embed/kp-${id}`}
          allowFullScreen
          loading="lazy"
          src={`//api.embess.ws/embed/movie/${id}`}  eli piratski playera karas nayes
        /> */}
        {/* <iframe
          loading="lazy"
          width="610"
          height="370"
          allowFullScreen
          allow="autoplay *; fullscreen"
          src={`https://kinokong.day/83922-film-voyna-i-muzyka.html`}
        ></iframe>{' '} */}
      </div>
    </div>
  );
};

export default Player;
