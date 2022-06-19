import io from "socket.io-client";
import { useSelector } from "react-redux";
import Peer from "peerjs";
import { useParams, useHistory } from "react-router-dom";
import Participants from "./participants/Participants";
import classes from "./Room.module.css";
import ToolBar from "./toolbar/ToolBar";
import { useCallback, useEffect, useState } from "react";

let timeout;
const Room = () => {
  const { roomId: ROOM_ID } = useParams();
  const [socket, setSocket] = useState(null);
  const [peer, setPeer] = useState(null);

  const user = useSelector((data) => data.user);
  const [participants, setParticipants] = useState([]);
  const [ssParticipant, setSSParticipant] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [isMouseOver, setIsMouseOver] = useState(true);
  const [isCamEnabled, setIsCamEnabled] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [defaultUser, setDefaultUser] = useState();
  const history = useHistory();

  console.log(participants);

  const addVideoStream = useCallback(
    function (stream, call, type = "user") {
      if (call) {
        if (type === "user") {
          console.log("new user");
          console.log(call.peer);
          setParticipants((prev) => {
            const res = prev.filter(
              (p) => p.user && p.user.peerId === call.peer
            );
            if (res.length === 0) {
              return [...prev, { user: { peerId: call.peer }, stream }];
            } else {
              return prev;
            }
          });
        } else if (type === "screen-share") {
          setSSParticipant((prev) => {
            return { user: { peerId: call.peer }, stream };
          });
        }
      } else {
        setParticipants((prev) => [
          ...prev,
          { user: { peerId: user.id }, stream },
        ]);
      }
    },
    [setParticipants, user]
  );

  const removeUser = useCallback((userId) => {
    setParticipants((prevParticipants) => {
      const newParticipants = prevParticipants.filter(
        (participant) => participant.user.peerId !== userId
      );
      return newParticipants;
    });
  }, []);

  const connectToNewUser = useCallback(
    function (userId, stream) {
      console.log("connected user" + userId);
      if (peer) {
        console.log("peer is here");
        const call = peer.call(userId, stream);
        console.log("call connected");
        call.on("stream", (userVideoStream) => {
          console.log("got stream");
          console.log(call);
          const userIdArr = userId.split("-");
          if (userIdArr.length > 1) {
            addVideoStream(userVideoStream, call, "screen-share");
          } else {
            addVideoStream(userVideoStream, call);
          }
        });
      }
    },
    [addVideoStream, peer]
  );

  useEffect(() => {
    let newSocket;
    if (process.env.NODE_ENV === "development") {
      newSocket = io(`http://192.168.29.30:8080/`);
    } else {
      newSocket = io(`https://tutoringbrains-backend-1.herokuapp.com/`);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  useEffect(() => {
    let newPeer = null;
    if (socket) {
      // newPeer = new Peer(user.id, {
      //   path: "/api/v1/peerjs",
      //   host: "/",
      //   port: "8080",
      // });

      if (process.env.NODE_ENV === "development") {
        newPeer = new Peer(user.id, {
          path: "/api/v1/peerjs",
          host: "/",
          port: "8080",
        });
      } else {
        newPeer = new Peer(user.id, {
          secure: true,
          path: "/api/v1/peerjs",
          host: "tutoringbrains-backend-1.herokuapp.com",
          port: "443",
        });
      }
      newPeer.on("open", (id) => {
        socket.emit("join-room", ROOM_ID, id);
      });
      setDefaultUser(user.id);
      setPeer(newPeer);
    }
    return () => newPeer && newPeer.disconnect();
  }, [ROOM_ID, setPeer, socket, user]);

  useEffect(() => {
    if (socket && peer) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setVideoStream(stream);
          addVideoStream(stream);
          stream.getVideoTracks()[0].enabled = false;
          stream.getAudioTracks()[0].enabled = false;

          socket.on("user-connected", (userId) => {
            connectToNewUser(userId, stream);
          });

          socket.on("user-disconnected", (userId) => {
            // connectToNewUser(userId, stream);
            removeUser(userId);
            console.log("dissconnected:" + userId);
          });

          socket.emit("ready");
        });
    }
  }, [socket, ROOM_ID, removeUser, addVideoStream, connectToNewUser, peer]);

  useEffect(() => {
    if (peer && videoStream) {
      peer.on("call", (call) => {
        console.log("ansering call");
        call.answer(videoStream);
        console.log("call done");
        call.on("stream", (userVideoStream) => {
          addVideoStream(userVideoStream, call);
        });
      });
    }
  }, [videoStream, addVideoStream, peer]);

  const onMicClickHandler = () => {
    // setIsMicEnabled((prev) => !prev);
    const isEnabled = videoStream.getAudioTracks()[0].enabled;
    if (isEnabled) {
      videoStream.getAudioTracks()[0].enabled = false;
    } else {
      videoStream.getAudioTracks()[0].enabled = true;
    }
  };
  const onCamClickHandler = () => {
    let isEnabled = videoStream.getVideoTracks()[0].enabled;
    if (isEnabled) {
      videoStream.getVideoTracks()[0].enabled = false;
    } else {
      videoStream.getVideoTracks()[0].enabled = true;
    }
  };

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  const onRoomDoubleClickHandler = (event) => {
    console.log("double click");
    toggleFullScreen();
  };

  const onRoomMouseOverHandler = (event) => {
    setIsMouseOver(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsMouseOver(false);
    }, 10000);
  };
  const onRoomMouseOutHandler = (event) => {
    // if (isMouseOver) {
    //   setIsMouseOver(false);
    // }
  };
  const onCallEndClickHandler = (event) => {
    videoStream.getTracks().forEach(function (track) {
      if (track.readyState === "live") {
        track.stop();
      }
    });
    peer.disconnect();
    socket.emit("disconnected", ROOM_ID, defaultUser);
  };

  useEffect(() => {
    // document.addEventListener("visibilitychange", (event) => {
    //   if (document.visibilityState === "visible") {
    //     console.log("tab is active");
    //   } else {
    //     console.log("tab is inactive");
    //     fetch("http://localhost:8080/api/v1/auth/windowSwitched", {
    //       method: "POST",
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     });
    //   }
    // });
    // window.onfocus = function (e) {
    //   console.log("gained focus");
    // };
    // window.onblur = function (e) {
    //   fetch("http://localhost:8080/api/v1/auth/windowSwitched", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   });
    // };
  }, []);

  const initScreenShare = (event) => {
    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: { mediaSource: "screen" },
      })
      .then((stream) => {
        let ssSocket;

        if (process.env.NODE_ENV === "development") {
          ssSocket = io(`http://192.168.29.30:8080/`);
        } else {
          ssSocket = io(`https://tutoringbrains-backend-1.herokuapp.com/`);
        }

        let ssPeer;
        if (process.env.NODE_ENV === "development") {
          ssPeer = new Peer(`ss-${user.id}`, {
            path: "/api/v1/peerjs",
            host: "/",
            port: "8080",
          });
        } else {
          ssPeer = new Peer(`ss-${user.id}`, {
            secure: true,
            path: "/api/v1/peerjs",
            host: "tutoringbrains-backend-1.herokuapp.com",
            port: "443",
          });
        }

        ssPeer.on("open", (id) => {
          ssSocket.emit("join-screen-share", ROOM_ID, id);
        });
        ssPeer.on("call", (call) => {
          console.log("ansering ss call");
          call.answer(stream);
          console.log("call done");
          // call.on("stream", (userVideoStream) => {
          //   addVideoStream(userVideoStream, call);
          // });
        });
        // ssPeer.disconnect();
        // socket.emit("disconnected", ROOM_ID, defaultUser);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        videoStream.getTracks().forEach(function (track) {
          if (track.readyState === "live") {
            track.stop();
          }
        });
      });
  };

  return (
    <div
      className={classes["room"]}
      onDoubleClick={onRoomDoubleClickHandler}
      onMouseOver={onRoomMouseOverHandler}
      onMouseOut={onRoomMouseOutHandler}
    >
      <div className={classes["room__participants--container"]}>
        <Participants
          participantsCount={participants.length}
          participants={participants}
          screenShare={ssParticipant}
          isMicEnabled={isMicEnabled}
        />
      </div>
      <ToolBar
        onCallEndClickHandler={onCallEndClickHandler}
        onCamClickHandler={onCamClickHandler}
        onMicClickHandler={onMicClickHandler}
        isMouseOver={isMouseOver}
        initScreenShare={initScreenShare}
      />
    </div>
  );
};

export default Room;
