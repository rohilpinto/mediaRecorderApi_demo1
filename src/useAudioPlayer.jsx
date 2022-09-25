import { useEffect, useRef, useState } from "react";

const useAudioPlayer = (source, isRecording) => {
  console.log("audioSource", source);
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  console.log("audioRef.current", audioRef.current);

  useEffect(() => {
    audioRef.current.src = source;
  }, [source]);

  useEffect(() => {
    if (isPlaying) {
      console.log("in isPLaying");
      audioRef.current.play();
    } else {
      console.log("in else isPLaying");

      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.onended = () => setIsPlaying(false);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleSetPlayingState = (state) => {
    setIsPlaying(state);
  };

  return [handlePlay, handleStop, isPlaying, handleSetPlayingState];
};

export default useAudioPlayer;
