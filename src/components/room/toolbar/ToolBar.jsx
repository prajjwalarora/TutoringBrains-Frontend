import classes from "./ToolBar.module.css";

import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

import CallEndIcon from "@mui/icons-material/CallEnd";
import { useState } from "react";
import Mic from "../../ui/mic/Mic";

const ToolBar = (props) => {
  const [isCamOn, setIsCamOn] = useState(false);
  const iconStyle = { color: "#fff", fontSize: 30, PointerEvent: "none" };
  return (
    <div className={classes["toolbar"]}>
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
        >
          <CallEndIcon style={iconStyle} />
        </div>
        <Mic onMicClickHandler={props.onMicClickHandler} />
      </div>
    </div>
  );
};

export default ToolBar;
