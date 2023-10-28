import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
import { HOME_ROUTE_PATH } from "../app_utils/route_paths/resolver/PageRoutes";
import { UserSessionUtils } from "../app_utils/utils/UserSessionUtils";
import { BaseApiServiceImpl } from "../app_utils/api/BaseApiServiceImpl";
import { MessageUtils } from "../app_utils/utils/MessageUtils";
import { Messages } from "primereact/messages";

const Login = () => {
  const [organisationCode, setOrganisationCode] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const history = useHistory();

  const message = useRef<any>();

  const goDashboard = () => {
    history.replace(HOME_ROUTE_PATH);
  };

  /**
   * This hook is called everytime the page is loaded
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This submits a save county request to the backoffice
   */
  const submitDetails = () => {
    let userData: any = {
      organisationCode: organisationCode,
      username: username,
      password: password,
      rememberMe: rememberMe,
    };

    setIsSaving(true);
    new BaseApiServiceImpl("/api/v1/auth/login")
      .postRequestWithJsonResponse(userData)
      .then(async (response) => {
        setIsSaving(false);
        UserSessionUtils.setUserDetails(response?.user);
        UserSessionUtils.setChurchDetails(response?.church);
        UserSessionUtils.setUserAuthToken(response?.accessToken);
        goDashboard();
      })
      .catch((error) => {
        setIsSaving(false);
        MessageUtils.showErrorMessage(message, error.message);
      });
  };

  return (
    <div className="pages-body login-page flex flex-column">
      <div className="align-self-center mt-auto mb-auto">
        <div className="pages-panel card flex flex-column">
          <div className="pages-header px-3 py-1">
            <h2>LOGIN</h2>
          </div>

          <h4>Welcome</h4>

          <div className="pages-detail mb-6 px-6">
            Sign into the Church ERP System
          </div>

          <div className="input-panel flex flex-column px-3">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-home"></i>
              </span>
              <span className="p-float-label">
                <InputText
                  type="text"
                  value={organisationCode}
                  onChange={(e) => setOrganisationCode(e.target.value)}
                  id="organisationCode"
                />
                <label htmlFor="organisationCode">Church Code</label>
              </span>
            </div>
            <div className="p-inputgroup mt-3 ">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <span className="p-float-label">
                <InputText
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                />
                <label htmlFor="username">Email/Username</label>
              </span>
            </div>
            <div className="p-inputgroup mt-3 mb-3">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <span className="p-float-label">
                <InputText
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
                <label htmlFor="inputgroup2">Password</label>
              </span>
            </div>
          </div>
          <Messages ref={message} style={{ width: "100%" }} />
          <Button
            loading={isSaving}
            className="login-button mb-6 px-3"
            label="LOGIN"
            onClick={submitDetails}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
