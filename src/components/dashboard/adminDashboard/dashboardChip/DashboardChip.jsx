import { useEffect, useState } from "react";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import EventIcon from "@mui/icons-material/Event";
import classes from "./DashboardChip.module.css";
import PieChart from "../../../ui/charts/PieChart";
import LineChart from "../../../ui/charts/LineChart";
import NoDataFound from "../../../../assets/images/no_data_found.svg";
import CloseIcon from "@mui/icons-material/Close";
import useHttp from "../../../../hooks/use-http";
import { getResult } from "../../../../lib/api";
import { useSelector } from "react-redux";
import Loader from "../../../ui/loader/Loader";

const DashboardChip = (props) => {
  const [isChipDetailsOpen, setIsChipDetailsOpen] = useState(false);
  const [isReqSent, setIsReqSent] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [sortedStudentResultData, setSortedStudentResultData] = useState(null);
  const [piChartData, setPiChart] = useState([0, 0, 0, 0, 0]);
  const auth = useSelector((data) => data.auth);
  const { sendRequest, data, status, error } = useHttp(getResult);

  useEffect(() => {
    if (isChipDetailsOpen && !isReqSent) {
      sendRequest({ token: auth.token, assessmentId: props.cardData.id });
      setIsReqSent(true);
    }
  }, [isChipDetailsOpen, isReqSent, auth.token, sendRequest, props]);
  useEffect(() => {
    if (status === "completed" && !error) {
      if (!resultData) {
        setResultData(data.assessments);
        const flattenData = data.assessments.map((assessment) => {
          return {
            name: assessment.user.name,
            score: assessment.marksObtained,
          };
        });
        const sortedResult = flattenData.sort((a, b) => b.score - a.score);
        setSortedStudentResultData(sortedResult);
      }
    }
  }, [status, data, error, resultData]);

  useEffect(() => {
    if (sortedStudentResultData) {
      const chartData = [0, 0, 0, 0, 0];
      sortedStudentResultData.forEach((data) => {
        const scorePer =
          (data.score /
            (resultData[0].correctAns + resultData[0].incorrectAns)) *
          100;
        if (scorePer >= 0 && scorePer < 11) {
          chartData[0] += 1;
        } else if (scorePer >= 11 && scorePer < 26) {
          chartData[1] += 1;
        } else if (scorePer >= 26 && scorePer < 51) {
          chartData[2] += 1;
        } else if (scorePer >= 51 && scorePer < 76) {
          chartData[3] += 1;
        } else if (scorePer >= 76 && scorePer <= 100) {
          chartData[4] += 1;
        }
      });
      setPiChart(chartData);
    }
  }, [sortedStudentResultData, resultData]);

  const onViewClickHandler = () => {
    setIsChipDetailsOpen((prev) => !prev);
  };
  return (
    <div className={classes["card-outer"]}>
      <div
        className={`${classes["card"]} ${
          classes[`card-${props.cardType || 1}`]
        }`}
      >
        <div className={classes["text-container"]}>
          <h3>
            <span>
              <ListAltOutlinedIcon />
            </span>
            {props.cardData.name || ""}
          </h3>
        </div>
        <div className={classes["timer"]}>
          <EventIcon style={{ fontSize: 20 }} />
          <span>{props.cardData.examDate.split("T")[0] || "2022-06-13"}</span>
        </div>
        <div
          className={`${classes["arc"]} ${
            classes[`arc-${props.cardType || 1}`]
          }`}
          onClick={onViewClickHandler}
        >
          <span>
            {isChipDetailsOpen ? (
              <CloseIcon style={{ fontSize: 26, marginTop: "30%" }} />
            ) : (
              "view"
            )}
          </span>
        </div>
      </div>
      <div
        className={`${classes["chip-details"]} ${
          isChipDetailsOpen ? "" : classes["chip-details-closed"]
        }`}
      >
        {status === "pending" && (
          <div className="no-data-container">
            <Loader />
          </div>
        )}
        {status === "completed" && resultData && resultData.length > 0 && (
          <div className={classes["chip-details-inner"]}>
            <div className={classes["text-info-container"]}>
              <div className={classes["text-info"]}>
                <p>
                  Total Students enrolled:
                  <span>{`${props.cardData.students.length}`}</span>
                </p>
              </div>
              <div className={classes["text-info"]}>
                <p>
                  Total Submission: <span>{resultData.length}</span>
                </p>
              </div>
              <div className={classes["text-info"]}>
                <p>
                  Total Marks:
                  <span>
                    {resultData[0].correctAns + resultData[0].incorrectAns}
                  </span>
                </p>
              </div>
              <div className={classes["text-info"]}>
                <p>
                  Max Scored: <span>{sortedStudentResultData[0].score}</span>
                </p>
              </div>
            </div>
            <div className={classes["chart-container"]}>
              <div className={classes["chart-1"]}>
                <LineChart
                  labels={sortedStudentResultData.map((data) => data.name)}
                  data={sortedStudentResultData.map((data) => data.score)}
                />
              </div>
              <div className={classes["chart-2"]}>
                <PieChart data={piChartData} />
              </div>
            </div>
          </div>
        )}
        {status === "completed" && resultData && resultData.length === 0 && (
          <div className="no-data-container">
            <img src={NoDataFound} alt="no data found" />
            <p className={classes["assessment-null"]}>
              No Submission has done.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardChip;
