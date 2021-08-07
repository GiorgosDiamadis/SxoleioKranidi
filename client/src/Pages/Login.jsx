import React, { useContext, useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";

import { useHistory } from "react-router-dom";
import { AuthContext } from "../useAuth";

const { postRequest } = require("../RequestController");
const { addClass, removeClass } = require("../domManipulation");

export default function Login(props) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errors && errors.length > 0) {
      showError(errors);
    }
  }, [errors]);
  const toast = useRef(null);
  let history = useHistory();
  const auth = useContext(AuthContext);

  const handleOnClick = () => {
    setIsLoading(true);
    postRequest("user/login", { ...loginData })
      .then((response) => {
        setIsLoading(false);
        auth.login(
          {
            ...response.data.user,
          },
          response.headers.authorization
        );
        history.push("/");
      })
      .catch((res) => {
        setIsLoading(false);
        setErrors(res.response.data.errors);
      });
  };

  const showError = (errors) => {
    var errorMessage = "";
    errors.forEach((error) => {
      errorMessage += error.msg + " ";
    });
    toast.current.show({
      severity: "error",
      summary: "Αποτυχία σύνδεσης",
      detail: errorMessage,
      sticky: true,
    });
  };

  return (
    <div
      className="p-d-flex p-flex-row p-jc-center p-ai-center"
      style={{ height: "100vh" }}
    >
      <Toast ref={toast} position={"top-center"} />
      <Card
        title="Σύνδεση διαχειρηστή"
        className="p-shadow-10 p-p-3 login-register-card"
        id="login"
      >
        <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
          <div className="p-inputgroup ">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <span className="p-float-label">
              <InputText
                id="username"
                tooltip="Εισάγετε το όνομα χρήστη"
                tooltipOptions={{ position: "top" }}
                aria-describedby="username-help"
                onChange={(e) => {
                  removeClass("username", "p-invalid");
                  addClass(`username-help`, "invisible");
                  setLoginData((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }));
                }}
              />
              <label htmlFor="username">Όνομα χρήστη</label>
            </span>
          </div>
          <div className="p-mt-4 p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <span className="p-float-label">
              <InputText
                id="password"
                tooltip="Εισάγετε τον κωδικό πρόσβασης"
                tooltipOptions={{ position: "top" }}
                aria-describedby="password-help"
                onChange={(e) => {
                  removeClass("password", "p-invalid");
                  addClass(`password-help`, "invisible");
                  setLoginData((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }));
                }}
                type="password"
              />
              <label htmlFor="password">Κωδικός πρόσβασης</label>
            </span>
          </div>

          <Button
            label="Σύνδεση"
            loading={isLoading}
            className="p-mt-2"
            onClick={handleOnClick}
          />
        </div>
      </Card>
    </div>
  );
}
