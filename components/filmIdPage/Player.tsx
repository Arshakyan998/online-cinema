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
        <iframe
          className="w-[1320px] h-[950px] border-0 p-10 rounded-sm m-auto"
          loading="lazy"
          src={`${process.env.NEXT_PUBLIC_PLAYER_SOURCE}/${id}`}
          contextMenu="12"
          security=""
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Player;
