import "./App.css";
import useAudioPlayer from "./useAudioPlayer";
import useMediaRecorderApi from "./useMediaRecorderApi";

function App() {
  const [audioUrl, isRecording, startRecording, stopRecording, handleDownload] = useMediaRecorderApi();

  const [handlePlay, handleStop, isPlaying] = useAudioPlayer(audioUrl, isRecording);

  console.log("audioURL", audioUrl);
  console.log("isRecording", isRecording);
  console.log("isPlaying", isPlaying);

  const types = ["audio/wav", "audio/mpeg", "audio/ogg", "audio/webm"];

  for (const type of types) {
    console.log(`Is ${type} supported? ${MediaRecorder.isTypeSupported(type) ? "Maybe!" : "Nope :("}`);
  }

  return (
    <div className="App">
      <h4>Recorder : Media Recorder API</h4>
      {types.map((type) => (
        <div style={{ margin: "20px" }}>
          Is {type} supported ? {MediaRecorder.isTypeSupported(type) ? "Maybe!" : "Nope :( "}
        </div>
      ))}
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
