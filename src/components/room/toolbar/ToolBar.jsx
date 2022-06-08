import classes from "./ToolBar.module.css";

import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";

import CallEndIcon from "@mui/icons-material/CallEnd";
import { useEffect, useState } from "react";
import icon from "../../../assets/images/tutoring-brains-icon.svg";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import Mic from "../../ui/mic/Mic";

const ToolBar = (props) => {
  const [isCamOn, setIsCamOn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const iconStyle = { color: "#fff", fontSize: 30, PointerEvent: "none" };

  useEffect(() => {
    setInterval(() => {
      // console.log();
      if (minutes === 59) {
        setHours((prev) => prev + 1);
        setSeconds(0);
      } else if (seconds === 59) {
        setMinutes((prev) => prev + 1);
        setSeconds(0);
      } else {
        setSeconds((prev) => prev + 1);
      }
      //     return prev + 1;
      //   } else {
      //     setMinutes((prev) => {
      //       if (prev < 59) {
      //         return prev + 1;
      //       } else {
      //         setHours((prev) => prev + 1);
      //         return 0;
      //       }
      //     });
      //     return 0;
      //   }
      // });
    }, 1000);
  }, []);

  // var minutes = Math.floor(seconds / 60);
  // var hours = Math.floor(seconds / 3600);
  function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  var finalTime =
    str_pad_left(hours, "0", 2) +
    ":" +
    str_pad_left(minutes, "0", 2) +
    ":" +
    str_pad_left(seconds, "0", 2);
  return (
    <div
      className={`${classes["toolbar"]} ${
        !props.isMouseOver ? classes["toolbar-hide"] : ""
      }`}
    >
      <div className={classes["logo"]}>
        <img src={icon} alt="logo" />
      </div>
      <div className={classes["timer"]}>
        <QueryBuilderIcon style={{ fontSize: 24, color: "#fff" }} />
        <p>{finalTime}</p>
        {/* <p>{`${parseInt("00", 10)}:${parseInt("00", 10)}:${parseInt(
          "00",
          10
        )}`}</p> */}
      </div>
      <div className={classes["ss"]} onClick={props.initScreenShare}>
        <PresentToAllIcon style={{ fontSize: 24, color: "#fff" }} />
      </div>
      <div className={classes["button-container"]}>
        <div
          className={classes["icon-container"]}
          style={{ backgroundColor: isCamOn ? "#1C7947" : "" }}
          onClick={() => {
            setIsCamOn((prev) => !prev);
            props.onCamClickHandler();
          }}
        >
          {isCamOn && <VideocamIcon style={iconStyle} />}
          {!isCamOn && <VideocamOffIcon style={iconStyle} />}
        </div>
        <div
          className={`${classes["icon-container"]} ${classes["icon-callend-container"]}`}
          onClick={props.onCallEndClickHandler}
        >
          <CallEndIcon style={iconStyle} />
        </div>
        <Mic onMicClickHandler={props.onMicClickHandler} />
      </div>
    </div>
  );
};

export default ToolBar;
