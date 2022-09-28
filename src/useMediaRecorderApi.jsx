/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import { useEffect, useState } from "react";
import fileSaver from "file-saver";

// eslint-disable-next-line no-unused-vars
const useMediaRecorderApi = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder()
          .then(setRecorder)
          .catch((err) => console.log("error requestRecorder", err));
      }

      return undefined;
    }

    // Manage recorder state.
    if (isRecording) {
      console.log("inside if recording");
      recorder.start();
    } else {
      console.log("inside else recording");
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      console.log("e.data", e.data);
      console.log("recorder.mimeType", recorder.mimeType);
      const blob = new Blob([e.data], { type: recorder.mimeType });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);

      // setRecordBlob({ blobURL: url, blob: e.data });
    };

    console.log("audioURL", audioURL);

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const handleDownload = () => {
    fileSaver.saveAs(audioURL, "voice.webm");
  };

  return [audioURL, isRecording, startRecording, stopRecording, handleDownload];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  // const options = {
  //   mimeType: "audio/webm",
  // };

  const mime = ["audio/wav", "audio/mpeg", "audio/webm", "audio/ogg"].filter((arr) => MediaRecorder.isTypeSupported(arr))[0];

  console.log("mime filter", mime);

  return new MediaRecorder(stream);
}
export default useMediaRecorderApi;
