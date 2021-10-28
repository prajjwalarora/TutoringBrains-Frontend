import { useEffect, useState } from "react";
import AnsBlock from "./ansBlock/AnsBlock";
import classes from "./AnsWindow.module.css";
const AnsWindow = () => {
  const [qnArr, setQnArr] = useState([]);
  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= 20; i++) {
      if (i <= 13) {
        arr.push(<AnsBlock isCompleted={true} qnNum={i} />);
      } else {
        arr.push(<AnsBlock isCompleted={false} qnNum={i} />);
      }
    }
    setQnArr(arr);
  }, []);
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
