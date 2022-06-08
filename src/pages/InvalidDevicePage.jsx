import { Fragment } from "react";
import InvalidDevice from "../components/invalidDevice/InvalidDevice";
import Header from "../components/ui/header/Header";

const InvalidDevicePage = () => {
  return (
    <Fragment>
      <Header isNav={false} />
      <InvalidDevice />
    </Fragment>
  );
};

export default InvalidDevicePage;
