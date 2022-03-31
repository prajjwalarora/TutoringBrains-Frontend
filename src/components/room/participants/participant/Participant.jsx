import { useEffect, useRef } from "react";
import Mic from "../../../ui/mic/Mic";
import classes from "./Participant.module.css";

const Participant = (props) => {
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
    let video = videoRef.current;
    video.srcObject = props.participant.stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  }, [props, videoRef]);

  return (
    <div className={classes["participant"]}>
      <div className={classes["mic-icon-container"]}>
        <Mic size="3rem" iconSize="20" isMicEnabled={props.isMicEnabled} />
      </div>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* <p className={classes["name"]}>{props.name}</p> */}
    </div>
  );
};

export default Participant;
