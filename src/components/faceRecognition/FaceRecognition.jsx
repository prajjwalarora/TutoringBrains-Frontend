import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import useHttp from "../../hooks/use-http";
import { registerDevice } from "../../lib/api";
import { authActions } from "../../store/auth-slice";
import { userActions } from "../../store/user-slice";
import classes from "./FaceRecognition.module.css";

let id;
var stream;

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { sendRequest, status, data, error } = useHttp(registerDevice);
  const [imageCapture, setImageCapture] = useState();
  const auth = useSelector((data) => data.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "pending") {
      id = toast.loading("Registring Device...", {
        position: "top-right",
        // autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (status === "completed") {
      if (!error) {
        toast.update(id, {
          render: "Device Registration Successfull",
          type: "success",
          isLoading: false,
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(userActions.updateUser(data.user));
        history.push("/");
      } else {
        toast.update(id, {
          render: "Device Registration failed",
          type: "error",
          isLoading: false,
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [status, error, history, data, dispatch]);

  function getMediaStream() {
    window.navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (mediaStream) {
        stream = mediaStream;
        let mediaStreamTrack = mediaStream.getVideoTracks()[0];
        let imageCapture = new ImageCapture(mediaStreamTrack);
        setImageCapture(imageCapture);
        // console.log(imageCapture);
      })
      .catch(error);
  }

  function takePhoto(img1) {
    const img = img1 || canvasRef.current;

    imageCapture
      .takePhoto()
      .then((blob) => {
        let url = window.URL.createObjectURL(blob);
        img.src = url;

        window.URL.revokeObjectURL(url);
      })
      .catch(error);
  }

  useEffect(() => {
    getMediaStream();
    if (imageCapture) {
      // takePhoto();
    }
  }, [imageCapture]);
  const registerDeviceHandler = () => {
    // sendRequest({
    //   token: auth.token,
    //   deviceData: { deviceFingerprint: auth.currDeviceFingerPrint },
    // });
  };

  const logoutHandler = async () => {
    dispatch(authActions.logout());
    history.push("/");
  };
  return (
    <div className={classes["registration-outer"]}>
      <div className={classes["registration-container"]}>
        <h3>Face Registration</h3>
        <p>this image will be used for future verifications.</p>
        <p>is this you?</p>
        <div>
          <img ref={canvasRef} alt="" />
          <video
            ref={videoRef}
            width={400}
            height={400}
            // controls
            autoPlay={true}
          ></video>
        </div>
        <div className={classes["btn-container"]}>
          <button onClick={registerDeviceHandler} className="btn btn-dark-blue">
            Capture
          </button>
          <button onClick={logoutHandler} className="btn">
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
