import { Fragment } from "react";
import DeviceRegistration from "../components/deviceRegistration/DeviceRegistration";
import Header from "../components/ui/header/Header";

const DeviceRegistrationPage = () => {
  return (
    <Fragment>
      <Header isNav={false} />
      <DeviceRegistration />
    </Fragment>
  );
};

export default DeviceRegistrationPage;
