import React, { useRef, useState, useEffect, useContext } from "react";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { ProgressBar } from "primereact/progressbar";
import { Menu } from "primereact/menu";
import { RTLContext } from "../App";
import { useHistory } from "react-router-dom";
import { ROLES_ROUTE_PATH } from "../app_utils/route_paths/resolver/PageRoutes";

const overviewChartData1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
  datasets: [
    {
      data: [50, 64, 32, 24, 18, 27, 20, 36, 30],
      borderColor: ["#4DD0E1"],
      backgroundColor: ["rgba(77, 208, 225, 0.8)"],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
};

const overviewChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
  datasets: [
    {
      data: [11, 30, 52, 35, 39, 20, 14, 18, 29],
      borderColor: ["#4DD0E1"],
      backgroundColor: ["rgba(77, 208, 225, 0.8)"],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
};

const overviewChartData3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
  datasets: [
    {
      data: [20, 29, 39, 36, 45, 24, 28, 20, 15],
      borderColor: ["#4DD0E1"],
      backgroundColor: ["rgba(77, 208, 225, 0.8)"],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
};

const overviewChartData4 = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
  datasets: [
    {
      data: [30, 39, 50, 21, 33, 18, 10, 24, 20],
      borderColor: ["#4DD0E1"],
      backgroundColor: ["rgba(77, 208, 225, 0.8)"],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
};

const overviewChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      display: false,
    },
  },
  tooltips: {
    enabled: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

const Dashboard = (props: any) => {
  const menu1 = useRef<any>(null);
  const menu2 = useRef<any>(null);
  const menu3 = useRef<any>(null);
  const isRTL = useContext(RTLContext);
  const history = useHistory();
  // Fixed for 6.1.0
  // eslint-disable-next-line
  const chart1 = useRef<any>(null);

  useEffect(() => {
    setOverviewColors();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getOverviewColors = () => {
    const isLight = props.colorMode === "light";
    return {
      pinkBorderColor: isLight ? "#E91E63" : "#EC407A",
      pinkBgColor: isLight ? "#F48FB1" : "#F8BBD0",
      tealBorderColor: isLight ? "#009688" : "#26A69A",
      tealBgColor: isLight ? "#80CBC4" : "#B2DFDB",
    };
  };

  const setOverviewColors = () => {
    const { pinkBorderColor, pinkBgColor, tealBorderColor, tealBgColor } = getOverviewColors();

    overviewChartData1.datasets[0].borderColor[0] = tealBorderColor;
    overviewChartData1.datasets[0].backgroundColor[0] = tealBgColor;

    overviewChartData2.datasets[0].borderColor[0] = tealBorderColor;
    overviewChartData2.datasets[0].backgroundColor[0] = tealBgColor;

    overviewChartData3.datasets[0].borderColor[0] = pinkBorderColor;
    overviewChartData3.datasets[0].backgroundColor[0] = pinkBgColor;

    overviewChartData4.datasets[0].borderColor[0] = tealBorderColor;
    overviewChartData4.datasets[0].backgroundColor[0] = tealBgColor;
  };

  useEffect(() => {
    if (props.isNewThemeLoaded) {
      props.onNewThemeChange(false);
      setOverviewColors();
    }
  }, [props.isNewThemeLoaded, props.onNewThemeChange]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid dashboard">
      <div
        className="col-12 md:col-6 lg:col-4"
        onClick={() => {
          history.replace(ROLES_ROUTE_PATH);
        }}
      >
        <div className="card overview-box flex flex-column pt-2">
          <div className="flex align-items-center muted-text">
            <i className="pi pi-users"></i>
            <h6 className={classNames("m-0", { "pl-2": !isRTL, "pr-2": isRTL })}>Members</h6>
            <div className={classNames({ "ml-auto": !isRTL, "mr-auto": isRTL })}>
              <Button type="button" icon="pi pi-ellipsis-h" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu1.current.toggle(event)}></Button>
            </div>
          </div>
          <div className="flex justify-content-between mt-3 flex-wrap">
            <div className="flex flex-column" style={{ width: "80px" }}>
              <span className="mb-1 fs-xlarge">640</span>
              <span className="overview-status p-1 teal-bgcolor fs-small">1420 New</span>
            </div>
            <div className="flex align-items-end">
              <Chart ref={chart1} type="line" data={overviewChartData1} options={overviewChartOptions} height="60px" width="160px"></Chart>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-4">
        <div className="card overview-box flex flex-column pt-2">
          <div className="flex align-items-center muted-text">
            <i className="pi pi-bars"></i>
            <h6 className={classNames("m-0", { "pl-2": !isRTL, "pr-2": isRTL })}>Pledges</h6>
            <div className={classNames({ "ml-auto": !isRTL, "mr-auto": isRTL })}>
              <Button type="button" icon="pi pi-ellipsis-h" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu2.current.toggle(event)}></Button>
              <Menu
                ref={menu2}
                popup
                model={[
                  { label: "Update", icon: "pi pi-fw pi-refresh" },
                  { label: "Edit", icon: "pi pi-fw pi-pencil" },
                ]}
              ></Menu>
            </div>
          </div>
          <div className="flex justify-content-between mt-3 flex-wrap">
            <div className="flex flex-column" style={{ width: "80px" }}>
              <span className="mb-1 fs-xlarge">57K</span>
              <span className="overview-status p-1 teal-bgcolor fs-small">9,640 Paid</span>
            </div>
            <div className="flex align-items-end">
              <Chart type="line" data={overviewChartData2} options={overviewChartOptions} height="60px" width="160px"></Chart>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-4">
        <div className="card overview-box flex flex-column pt-2">
          <div className="flex align-items-center muted-text">
            <i className="pi pi-dollar"></i>
            <h6 className={classNames("m-0", { "pl-2": !isRTL, "pr-2": isRTL })}>Payments</h6>
            <div className={classNames({ "ml-auto": !isRTL, "mr-auto": isRTL })}>
              <Button type="button" icon="pi pi-ellipsis-h" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu3.current.toggle(event)}></Button>
              <Menu
                ref={menu3}
                popup
                model={[
                  { label: "Update", icon: "pi pi-fw pi-refresh" },
                  { label: "Edit", icon: "pi pi-fw pi-pencil" },
                ]}
              ></Menu>
            </div>
          </div>
          <div className="flex justify-content-between mt-3 flex-wrap">
            <div className="flex flex-column" style={{ width: "120px" }}>
              <span className="mb-1 fs-xlarge">8572</span>
              <span className="overview-status p-1 pink-bgcolor fs-small">25 This month</span>
            </div>
            <div className="flex align-items-end">
              <Chart type="line" data={overviewChartData3} options={overviewChartOptions} height="60px" width="160px"></Chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const comparisonFn = function (prevProps: any, nextProps: any) {
  return (
    prevProps.location.pathname === nextProps.location.pathname &&
    prevProps.colorMode === nextProps.colorMode &&
    prevProps.isNewThemeLoaded === nextProps.isNewThemeLoaded &&
    prevProps.onNewThemeChange === nextProps.onNewThemeChange
  );
};

export default React.memo(Dashboard, comparisonFn);
