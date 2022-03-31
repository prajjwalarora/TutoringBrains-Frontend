import io from "socket.io-client";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import Participants from "./participants/Participants";
import classes from "./Room.module.css";
import ToolBar from "./toolbar/ToolBar";
import { useCallback, useEffect, useState } from "react";

const Room = () => {
  const { roomId: ROOM_ID } = useParams();
  const [socket, setSocket] = useState(null);
  const [peer, setPeer] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [videoStream, setVideoStream] = useState(null);
  const [isMicEnabled, setIsMicEnabled] = useState(false);

  const addVideoStream = useCallback(
    function (stream, call) {
      if (call) {
        console.log("new user");
        setParticipants((prev) => {
          const res = prev.filter((p) => p.user && p.user.peerId === call.peer);
          if (res.length === 0) {
            return [...prev, { user: { peerId: call.peer }, stream }];
          } else {
            return prev;
          }
        });
      } else {
        setParticipants((prev) => [...prev, { stream }]);
      }
    },
    [setParticipants]
  );

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
          addVideoStream(userVideoStream, call);
        });
      }
    },
    [addVideoStream, peer]
  );

  useEffect(() => {
    const newSocket = io(`http://localhost:8080/`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  useEffect(() => {
    let newPeer = null;
    if (socket) {
      newPeer = new Peer(undefined, {
        path: "/api/v1/peerjs",
        host: "/",
        port: "8080",
      });
      newPeer.on("open", (id) => {
        socket.emit("join-room", ROOM_ID, id);
      });
      setPeer(newPeer);
    }
    return () => newPeer && newPeer.disconnect();
  }, [ROOM_ID, setPeer, socket]);

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

          peer.on("call", (call) => {
            console.log("ansering call");
            call.answer(stream);
            console.log("call done");
            call.on("stream", (userVideoStream) => {
              addVideoStream(userVideoStream, call);
            });
          });
          socket.emit("ready");
        });
    }
  }, [socket, ROOM_ID, addVideoStream, connectToNewUser, peer]);

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

  return (
    <div className={classes["room"]}>
      <div className={classes["room__participants--container"]}>
        <Participants participants={participants} isMicEnabled={isMicEnabled} />
      </div>
      <ToolBar
        onCamClickHandler={onCamClickHandler}
        onMicClickHandler={onMicClickHandler}
      />
    </div>
  );
};

export default Room;
