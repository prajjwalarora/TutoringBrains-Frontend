import DashboardHeader from "../../ui/dashboardHeader/DashboardHeader";
import AdminDashboardSideNav from "./adminDashboardSideNav/AdminDashboardSideNav";

import MainDashboard from "./mainDahsboard/MainDashboard";
import { useParams } from "react-router-dom";
import AccountDashboard from "./accountDashboard/AccountDashboard";
import useHttp from "../../../hooks/use-http";
import { getMe } from "../../../lib/api";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user-slice";
import ClassDashboard from "./classDashboard/ClassDashboard";
import AssessmentDashboard from "./assessmentDashboard/AssessmentDashboard";
import classes from "./AdminDashboard.module.css";
import { useHistory } from "react-router-dom";
import CreateAssessment from "./assessmentDashboard/createAssessment/CreateAssessment";
import CreateClass from "./classDashboard/createClass/CreateClass";

const AdminDashboard = () => {
  const { sendRequest, status, data, error } = useHttp(getMe);
  const dispatch = useDispatch();
  const auth = useSelector((data) => data.auth);
  const params = useParams();
  const history = useHistory();

  // useEffect(() => {
  //   if (auth) sendRequest({ token: auth.token });
  // }, [auth, sendRequest]);
  // console.log(data);
  // useEffect(() => {
  //   if (status === "completed" && !error && data) {
  //     dispatch(
  //       userActions.setUser({
  //         id: data.data["_id"],
  //         name: data.data.name,
  //         avatar: data.data.avatar,
  //         email: data.data.email,
  //         phone: data.data.phone || "",
  //         role: data.data.role,
  //       })
  //     );
  //   }
  // }, [dispatch, error, data, status]);

  const onCreateAssessmentClickHandler = () => {
    history.push("/dashboard/user/assessments/create-assessment");
  };
  const onCreateClassClickHandler = () => {
    history.push("/dashboard/user/classes/schedule-class");
    console.log("nsnjsd");
  };
  console.log(params);

  return (
    <div className={classes["dashboard"]}>
      <DashboardHeader />
      <div className={`${classes["dashboard-inner"]} container-inner-big`}>
        <div className={classes["dashboard-sidebar"]}>
          <AdminDashboardSideNav />
        </div>
        {params.section === "home" && (
          <MainDashboard
            onCreateClassClickHandler={onCreateClassClickHandler}
          />
        )}
        {params.section === "classes" && !params.action && (
          <ClassDashboard
            onCreateClassClickHandler={onCreateClassClickHandler}
          />
        )}
        {params.section === "assessments" && !params.action && (
          <AssessmentDashboard
            onCreateAssessmentClickHandler={onCreateAssessmentClickHandler}
          />
        )}
        {params.section === "account" && <AccountDashboard />}
        {params.section === "assessments" &&
          params.action === "create-assessment" && <CreateAssessment />}
        {params.section === "classes" && params.action === "schedule-class" && (
          <CreateClass />
        )}
      </div>
    </div>
  );
};

export default React.memo(AdminDashboard);
