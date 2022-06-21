import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import useHttp from "../../hooks/use-http";
import useLoader from "../../hooks/use-loader";
import {
  registerDevice,
  updateMe,
  uploadImage,
  verifySpeech,
} from "../../lib/api";
import { authActions } from "../../store/auth-slice";
import { userActions } from "../../store/user-slice";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import classes from "./SpeechVerification.module.css";

const SpeechVerification = (props) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { sendRequest, status, data, error } = useHttp(verifySpeech);

  const [imageCapture, setImageCapture] = useState();
  const [reqSent, setReqSent] = useState(false);
  const auth = useSelector((data) => data.auth);
  const user = useSelector((data) => data.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useLoader(
    status,
    error,
    "Uploading audio...",
    "Speech verified Successfully",
    "Speech Upload failled"
  );

  useEffect(() => {
    if (status === "completed" && !error) {
      if (!reqSent) {
        if (data.text === "hi i'm doing something")
          props.setIsAudioVerified(true);
        setReqSent(true);
      }
    }
  }, [status, error, dispatch, history, data, reqSent, auth, user]);

  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  const textPrint = () => {
    sendRequest({ userAudio: utf8_to_b64(transcript) });
  };
  const logoutHandler = async () => {
    dispatch(authActions.logout());
    history.push("/");
  };
  return (
    <div className={classes["registration-outer"]}>
      <div className={classes["registration-container"]}>
        <div>
          <h3>Please verify audio!</h3>
          <p>Microphone: {listening ? "on" : "off"}</p>
          {/* <p>{transcript}</p> */}
        </div>
        <div className={classes["btn-container"]}>
          <div className={classes["btn-wrapper"]}>
            <button
              className="btn btn-blue"
              onClick={SpeechRecognition.startListening}
            >
              Start
            </button>
            <button
              className="btn btn-blue"
              onClick={SpeechRecognition.stopListening}
            >
              Stop
            </button>
            <button className="btn btn-blue" onClick={textPrint}>
              Verify
            </button>
          </div>
          {/* <div className={classes["btn-wrapper"]}>
            <button className="btn btn-dark-blue" onClick={resetTranscript}>
              Reset
            </button>
            <button className="btn btn-dark-blue" onClick={logoutHandler}>
              logout
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SpeechVerification;
