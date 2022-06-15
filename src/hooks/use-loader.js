import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

let id;
function useLoader(status, error, loadingMsg, successMsg, errorMsg) {
  const history = useHistory();

  useEffect(() => {
    if (status === "pending") {
      id = toast.loading(loadingMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (status === "completed") {
      if (!error) {
        toast.update(id, {
          render: successMsg,
          type: "success",
          isLoading: false,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.update(id, {
          render: errorMsg,
          type: "error",
          isLoading: false,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [status, error, history, errorMsg, successMsg, loadingMsg]);
}

export default useLoader;
