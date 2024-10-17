import { Flex, Text, keyframes } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { currentAudioInstanceAtom } from "../../lib/atoms";
import { useAtom } from "jotai";

function TextPlayer({ audioUrl, textProps, text, onMouseEnter, onMouseLeave }) {
  const audioRef = useRef(null);

  const [currentAudioInstance, setCurrentAudioInstance] = useAtom(currentAudioInstanceAtom);
  const [isPlaying, setIsPlaying] = useState(false);

  const scaleKeyframes = keyframes`
  to {transform:  scale(1.10)}`;

  const scaleDown = `${scaleKeyframes} infinite 600ms alternate ease-in`;

  const togglePlayStop = () => {
    const audio = audioRef.current;

    if (currentAudioInstance && currentAudioInstance !== audio) {
      currentAudioInstance.pause();
      currentAudioInstance.currentTime = 0;
    }

    if (audio.paused) {
      audio.play();
      setCurrentAudioInstance(audio);
      setIsPlaying(true);
    } else {
      audio.pause();
      audio.currentTime = 0;
      setCurrentAudioInstance(null);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
   
    if (currentAudioInstance && currentAudioInstance !== audio) {
      setIsPlaying(false);
    }
  }
  , [currentAudioInstance]);

  useEffect(() => {
    const audio = audioRef.current;
    const endedHandler = () => {
      setIsPlaying(false);
      setCurrentAudioInstance(null);
    };
    audio.addEventListener("ended", endedHandler);
    return () => {
      audio.removeEventListener("ended", endedHandler);
    };
  }, [ setCurrentAudioInstance]);

  return (
    <>
      <Flex as="audio" ref={audioRef} src={audioUrl} display="none"></Flex>
      {isPlaying ? (
        <Text
          as="a"
          {...textProps}
          transition="all 100ms"
          transform="scale(1.08)"
          animation={scaleDown}
          _hover={{
            transform: "scale(1.08)",
            cursor: "pointer",
          }}
          onClick={togglePlayStop}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          _before={{ content: '" 🔊 "' }}
          _after={{ content: '" 🔊 "' }}
        >
          {text}
        </Text>
      ) : (
        <Text
          as="a"
          {...textProps}
          transition="all 200ms"
          _hover={{
            transform: "scale(1.05)",
            cursor: "pointer",
          }}
          onClick={togglePlayStop}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {text}
        </Text>
      )}
    </>
  );
}

export default TextPlayer;
