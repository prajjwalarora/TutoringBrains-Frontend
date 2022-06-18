import { Fragment } from "react";
import FaceVerification from "../components/faceVerification/FaceVerification";
import Header from "../components/ui/header/Header";

const FaceVerificationPage = () => {
  return (
    <Fragment>
      <Header isNav={false} />
      <FaceVerification />
    </Fragment>
  );
};

export default FaceVerificationPage;
