import React, { useContext } from "react";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { RTLContext } from "./App";

const AppFooter = (props: any) => {
  const isRTL = useContext(RTLContext);

  return (
    <div className="layout-footer flex align-items-center p-4 shadow-2">
      <img id="footer-logo" width={100} src={`assets/layout/images/${props.colorMode === "light" ? "waci-dark" : "waci-white"}.png`} alt="ultima-footer-logo" />
      <Button type="button" icon="pi pi-github fs-large" className={classNames("p-button-rounded p-button-text p-button-plain", { "ml-auto mr-2": !isRTL, "ml-2 mr-auto": isRTL })}></Button>
      <Button type="button" icon="pi pi-facebook fs-large" className={classNames("p-button-rounded p-button-text p-button-plain", { "mr-2": !isRTL, "ml-2": isRTL })}></Button>
      <Button type="button" icon="pi pi-twitter fs-large" className={classNames("p-button-rounded p-button-text p-button-plain", { "mr-2": !isRTL, "ml-2": isRTL })}></Button>
    </div>
  );
};

export default AppFooter;
