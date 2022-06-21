import React from "react";
import InvalidDevice from "../components/invalidDevice/InvalidDevice";
import Header from "../components/ui/header/Header";
import VerifyStatus from "../components/verifyStatus/VerifyStatus";

const ClassPage = () => {
  return (
    <>
      <Header isNav={false} />
      <VerifyStatus />
    </>
  );
};

export default ClassPage;
