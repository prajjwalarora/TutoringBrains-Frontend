import { useEffect, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import classes from "./Mic.module.css";
const Mic = (props) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const iconStyle = {
    color: "#fff",
    fontSize: props.iconSize ? props.iconSize : 30,
    PointerEvent: "none",
  };
  useEffect(() => {
    if (props.isMicEnabled != null) setIsMicOn(props.isMicEnabled);
  }, [props]);
  return (
    <div
      className={classes["icon-container"]}
      style={{
        backgroundColor: isMicOn ? "#1C7947" : "",
        height: props.size ? props.size : "5rem",
        width: props.size ? props.size : "5rem",
      }}
      onClick={() => {
        setIsMicOn((prev) => !prev);
        props.onMicClickHandler && props.onMicClickHandler();
      }}
    >
      {isMicOn && <MicIcon style={iconStyle} />}
      {!isMicOn && <MicOffIcon style={iconStyle} />}
    </div>
  );
};

export default Mic;
