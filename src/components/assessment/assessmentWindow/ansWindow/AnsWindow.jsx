import { useEffect, useState } from "react";
import AnsBlock from "./ansBlock/AnsBlock";
import classes from "./AnsWindow.module.css";
const AnsWindow = (props) => {
  const [qnArr, setQnArr] = useState([]);
  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= props.totalCount; i++) {
      if (props.completed.includes(i)) {
        arr.push(
          <AnsBlock
            key={i}
            isCompleted={true}
            qnNum={i}
            onClickHandler={() => props.onChangeQn(i)}
          />
        );
      } else {
        arr.push(
          <AnsBlock
            key={i}
            isCompleted={false}
            qnNum={i}
            onClickHandler={() => props.onChangeQn(i)}
          />
        );
      }
    }
    setQnArr(arr);
  }, [props]);
  return (
    <div className={`card ${classes["ans-window"]}`}>
      <div className={`${classes["ans-window-inner"]}`}>{qnArr}</div>
    </div>
  );
};

export default AnsWindow;
