"use client";

import React, { useEffect } from "react";

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
          className="w-full h-full border-0 p-10 rounded-sm"
          loading="lazy"
          src={`${process.env.NEXT_PUBLIC_PLAYER_SOURCE}/${id}`}
          contextMenu="12"
          security=""
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Player;
