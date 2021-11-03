import { useEffect, useState } from "react";
import AnsBlock from "./ansBlock/AnsBlock";
import classes from "./AnsWindow.module.css";
const AnsWindow = (props) => {
  const [qnArr, setQnArr] = useState([]);
  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= props.totalCount; i++) {
      if (i <= props.completedTill) {
        arr.push(<AnsBlock key={i} isCompleted={true} qnNum={i} />);
      } else {
        arr.push(<AnsBlock key={i} isCompleted={false} qnNum={i} />);
      }
    }
    setQnArr(arr);
  }, [props.completedTill, props.totalCount]);
  return (
    <div className={`card ${classes["ans-window"]}`}>
      <div className={`${classes["ans-window-inner"]}`}>{qnArr}</div>
      <div className={classes["btn-container"]}>
        <button className={`btn ${classes["btn-save"]}`}>Save</button>
      </div>
    </div>
  );
};

export default AnsWindow;
