import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../../../hooks/use-http";
import { getUser } from "../../../../lib/api";
import Mic from "../../../ui/mic/Mic";
import classes from "./Participant.module.css";
import { v4 as uuid } from "uuid";

const Participant = (props) => {
  const { sendRequest, status, data, error } = useHttp(getUser);
  const [userName, setUserName] = useState("");
  const auth = useSelector((data) => data.auth);
  console.log();
  useEffect(() => {
    sendRequest({ token: auth.token, userId: props.participant.user.peerId });
  }, []);

  useEffect(() => {
    if (status === "completed" && !error) {
      if (userName.length === 0) {
        setUserName(data.data.name);
      }
    }
  }, [status, error, data, userName]);
  const videoRef = useRef(null);
  // const getVideo = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: { width: 300 } })
  //     .then((stream) => {
  //       let video = videoRef.current;
  //       video.srcObject = stream;
  //       video.play();
  //     })
  //     .catch((err) => {
  //       console.error("error:", err);
  //     });
  // };

  useEffect(() => {
    setInterval(() => {
      const canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      canvas.width = 400;
      canvas.height = 800;
      context.drawImage(videoRef.current, 0, 0, 400, 800);
      var data = canvas.toDataURL("image/jpeg");
      let url;
      // const url = `https://tutoringbrains-backend-1.herokuapp.com/api/v1`;

      if (process.env.NODE_ENV === "development") {
        // url = `http://192.168.29.30:8080/api/v1`;
        url = `http://192.168.6.71:8080/api/v1`;
      } else {
        url = `https://tutoringbrains-backend-1.herokuapp.com/api/v1`;
      }
      fetch(`${url}/auth/authImage`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: `class-${userName.id ? userName.id : ""}-${uuid()}`,
          image: data,
        }),
      });
    }, 20000);
  }, [props.participant, userName]);

  useEffect(() => {
    let video = videoRef.current;
    video.srcObject = props.participant.stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  }, [props, videoRef]);

  return (
    <div className={classes["participant"]}>
      {/* <div className={classes["mic-icon-container"]}>
        <Mic size="3rem" iconSize="20" isMicEnabled={props.isMicEnabled} />
      </div> */}
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          objectFit: `${
            props.participantType === "user" ? "cover" : "contain"
          }`,
        }}
      />
      <p className={classes["name"]}>{userName}</p>
    </div>
  );
};

export default Participant;
