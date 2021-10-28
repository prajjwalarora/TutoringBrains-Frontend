import { Fragment } from "react";
// import Footer from "../ui/footer/Footer";
import Header from "../ui/header/Header";
import AssessmentWindow from "./assessmentWindow/AssessmentWindow";

const Assessment = () => {
  return (
    <Fragment>
      <Header isNav={false} isTimer={true} />
      <div className="container-nh">
        <div className="container-inner">
          <AssessmentWindow />
        </div>
      </div>
      {/* <Footer /> */}
    </Fragment>
  );
};

export default Assessment;
