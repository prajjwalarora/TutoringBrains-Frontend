import icon from "../../../assets/images/tutoring-brains-icon.svg";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`container ${classes["footer"]}`}>
      <div className="container-inner">
        <img src={icon} alt="tutoring brains" />
      </div>
    </footer>
  );
};

export default Footer;
