import React, { useState } from "react";
import useSound from "use-sound";
import backgroundMusic from "./sounds/bg.mp3";
import { SoundButton, SoundIcon } from "./styled-components";
import SoundOn from '../images/sound-on.png';
import SoundOff from '../images/sound-off.png';

const Player = () => {
  const [play, { pause }] = useSound(backgroundMusic, { loop: true });

  const [musicPlaying, setMusicPlaying] = useState(true);

  function handleClick() {
    setMusicPlaying(!musicPlaying);
  }

  return (
    <>
      <SoundButton onClick={handleClick}>
        {musicPlaying ? <SoundIcon src={SoundOn} /> : <SoundIcon src={SoundOff} /> }
      </SoundButton>
      {musicPlaying ? play() : pause()}
    </>
  );
};

export default React.memo(Player);
