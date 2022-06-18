import { Fragment } from "react";
import FaceRecognition from "../components/faceRecognition/FaceRecognition";
import Header from "../components/ui/header/Header";

const FaceRecognitionPage = () => {
  return (
    <Fragment>
      <Header isNav={false} />
      <FaceRecognition />
    </Fragment>
  );
};

export default FaceRecognitionPage;
