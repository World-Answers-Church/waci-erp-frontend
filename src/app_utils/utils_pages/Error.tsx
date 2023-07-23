import React from "react";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";

const Error = () => {
    const history = useHistory();

    const goDashboard = () => {
        history.push("/");
    };

    return (
        <div className="pages-body error-page flex flex-column">
            <div className="align-self-center mt-auto mb-auto">
                <div className="pages-panel card flex flex-column">
                    <div className="pages-header px-3 py-1">
                        <h2>ERROR</h2>
                    </div>
                    <div className="card mt-3 px-6">
                        <img src="/assets/layout/images/pages/error.png" alt="" />
                    </div>
                    <div className="pages-detail pb-6">Requested resource is not available.</div>
                    <Button onClick={goDashboard} type="button" label="GO BACK TO DASHBOARD" className="p-button-text"></Button>
                </div>
            </div>
        </div>
    );
};

export default Error;
