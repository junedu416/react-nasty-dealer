import React, { useState } from "react";
import useSound from "use-sound";
import backgroundMusic from "./sounds/bgmMusic.mp3"

const Player = () => {
    const [play,{pause}] = useSound(backgroundMusic);
    const [musicPlaying, setMusicPlaying] = useState(false)

    function handleClick(){
        setMusicPlaying(!musicPlaying)
    }

    return (
        <>
            <button onClick={handleClick}>{musicPlaying ? "Stop":"Play Background Music" }</button>
            {musicPlaying ? play():pause()}
        </>
    )
}
  
  export default React.memo(Player);