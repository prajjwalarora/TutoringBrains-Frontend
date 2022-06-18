import { useEffect, useState } from "react";
import Participant from "./participant/Participant";
import classes from "./Participants.module.css";

const Participants = (props) => {
  const [participantCount, setParticipantCount] = useState(1);
  const [ssCount, setSSCount] = useState(0);
  const [rowCount, setRowCount] = useState(1);
  const [colCount, setColCount] = useState(1);
  console.log(props.screenShare);

  useEffect(() => {
    if (props.participants) {
      setParticipantCount(props.participants.length);
    }
    if (props.screenShare) {
      setSSCount(1);
    }
  }, [props]);
  useEffect(() => {
    if (ssCount === 0) {
      if (participantCount > 1) {
        if (participantCount > 1 && participantCount < 3) {
          setColCount(2);
        } else if (participantCount >= 3 && participantCount < 5) {
          setRowCount(2);
          setColCount(2);
        } else if (participantCount >= 5 && participantCount < 7) {
          setRowCount(2);
          setColCount(3);
        } else if (participantCount >= 7 && participantCount < 10) {
          setRowCount(3);
          setColCount(3);
        } else if (participantCount >= 10 && participantCount < 13) {
          setRowCount(3);
          setColCount(4);
        } else if (participantCount >= 13 && participantCount < 17) {
          setRowCount(4);
          setColCount(4);
        }
      }
    }
  }, [participantCount, ssCount]);
  return (
    <div
      className={classes["participants__container"]}
      style={
        ssCount === 0
          ? {
              gridTemplateColumns: `repeat(${colCount}, minmax(250px, 1fr))`,
              gridTemplateRows: `repeat(${rowCount}, 1fr)`,
            }
          : {
              gridTemplateColumns: `75% 25%`,
              gridTemplateRows: `1fr`,
            }
      }
    >
      {ssCount > 0 && (
        <div>
          <Participant
            participant={props.screenShare}
            name="Prajjwal Arora"
            isMicEnabled={props.isMicEnabled}
          />
        </div>
      )}
      {ssCount === 0 ? (
        <>
          {props.participants.map((participant, index) => (
            <Participant
              key={index}
              participant={participant}
              name="Prajjwal Arora"
              isMicEnabled={props.isMicEnabled}
            />
          ))}
        </>
      ) : (
        <div className={classes["side-user-container"]}>
          {props.participants.map(
            (participant, index) =>
              index < 4 && (
                <Participant
                  key={index}
                  participant={participant}
                  name="Prajjwal Arora"
                  isMicEnabled={props.isMicEnabled}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Participants;
