import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import useHttp from "../../hooks/use-http";
import useLoader from "../../hooks/use-loader";
import { registerDevice, updateMe, uploadImage } from "../../lib/api";
import { authActions } from "../../store/auth-slice";
import { userActions } from "../../store/user-slice";
import classes from "./FaceRecognition.module.css";

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { sendRequest, status, data, error } = useHttp(uploadImage);
  const {
    sendRequest: updateUser,
    status: updateUserStatus,
    data: updateUserData,
    error: updateUserError,
  } = useHttp(updateMe);
  const [imageCapture, setImageCapture] = useState();
  const [reqSent, setReqSent] = useState(false);
  const auth = useSelector((data) => data.auth);
  const user = useSelector((data) => data.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useLoader(
    status,
    error,
    "Uploading image...",
    "Image uploaded Successfully",
    "Image Upload failled"
  );

  useEffect(() => {
    if (status === "completed" && !error) {
      if (!reqSent) {
        updateUser({
          token: auth.token,
          userData: { avatar: `avatar-${user.id}` },
        });
        setReqSent(true);
      }
    }
  }, [status, error, dispatch, history, data, reqSent, auth, user, updateUser]);

  useEffect(() => {
    if (updateUserStatus === "completed" && !updateUserError) {
      console.log(updateUserData);
      dispatch(userActions.updateUser(updateUserData.user));
      setTimeout(() => {
        history.push("/");
      }, 400);
    }
  }, [
    updateUserStatus,
    updateUserError,
    updateUserData,
    dispatch,
    history,
    data,
  ]);

  function getMediaStream() {
    window.navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  }

  // function takePhoto(img1) {
  //   const img = img1 || canvasRef.current;

  //   imageCapture
  //     .takePhoto()
  //     .then((blob) => {
  //       let url = window.URL.createObjectURL(blob);
  //       img.src = url;

  //       window.URL.revokeObjectURL(url);
  //     })
  //     .catch(error);
  // }

  useEffect(() => {
    getMediaStream();
    if (imageCapture) {
      // takePhoto();
    }
  }, [imageCapture]);
  const registerFaceHandler = () => {
    const canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 600;
    context.drawImage(videoRef.current, 0, 0, 400, 600);
    var data = canvas.toDataURL("image/jpeg");
    // fetch("http://localhost:8080/api/v1/auth/authImage", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(),
    // });
    sendRequest({
      userId: `avatar-${user.id}`,
      image: data,
    });
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
          {/* <img ref={canvasRef} alt="" /> */}
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div className={classes["btn-container"]}>
          <button onClick={registerFaceHandler} className="btn btn-dark-blue">
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
