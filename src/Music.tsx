import React, { useState } from "react";

type Props = {
  audio: string;
};

const Music = (props: Props) => {
  const { audio } = props;
  const sound = new Audio(audio);

  const [playing, setPlaying] = useState(false);

  return (
    <button
      onClick={() => {
        if (!playing) {
          sound.play();
        }
        setPlaying(false);
      }}
      className="w-16 flex justify-center items-center h-16 rounded-full dark:text-black bg-blue-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default Music;
