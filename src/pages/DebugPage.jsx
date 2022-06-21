import { Fragment } from "react";
import DeviceRegistration from "../components/deviceRegistration/DeviceRegistration";
import Header from "../components/ui/header/Header";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const DebugPage = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  const textPrint = () => {
    console.log("====================================");
    console.log(utf8_to_b64(transcript));
    console.log("====================================");
  };
  return (
    <Fragment>
      <Header isNav={false} />
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={textPrint}>Print</button>
        <p>{transcript}</p>
      </div>
    </Fragment>
  );
};

export default DebugPage;
