import { Fragment } from "react";
import DeviceRegistration from "../components/deviceRegistration/DeviceRegistration";
import Header from "../components/ui/header/Header";

const DebugPage = () => {
  return (
    <Fragment>
      <Header isNav={false} />
      <DeviceRegistration />
    </Fragment>
  );
};

export default DebugPage;
