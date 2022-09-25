import "./App.css";
import useAudioPlayer from "./useAudioPlayer";
import useMediaRecorderApi from "./useMediaRecorderApi";

function App() {
  const [audioUrl, isRecording, startRecording, stopRecording, handleDownload] = useMediaRecorderApi();

  const [handlePlay, handleStop, isPlaying] = useAudioPlayer(audioUrl, isRecording);

  console.log("audioURL", audioUrl);
  console.log("isRecording", isRecording);
  console.log("isPlaying", isPlaying);

  return (
    <div className="App">
      <h4>Recorder : Media Recorder API</h4>

      <div>
        <button onClick={isRecording ? stopRecording : startRecording}>{isRecording ? "Stop Recording" : "Start Recording"}</button>
        <button disabled={!audioUrl} onClick={isPlaying ? handleStop : handlePlay}>
          {isPlaying ? "pause" : "play"}
        </button>
        <button disabled={!audioUrl} onClick={handleDownload}>
          Download audio
        </button>
      </div>
    </div>
  );
}

export default App;
