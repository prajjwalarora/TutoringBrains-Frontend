import classes from "./AnsBlock.module.css";
const AnsBlock = (props) => {
  return (
    <div
      className={`${classes["ans-block"]} ${
        props.isCompleted ? classes["ans-block-completed"] : ""
      }`}
      onClick={props.onClickHandler}
    >
      <span>{props.qnNum}</span>
    </div>
  );
};

export default AnsBlock;
