import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
import { MAXIMUM_RECORDS_PER_PAGE } from "../app_utils/constants/Constants";
import { BaseApiServiceImpl } from "../app_utils/api/BaseApiServiceImpl";
import {
  LOGIN_ROUTE_PATH,
  REGISTER_ORGANISATION_ROUTE_PATH,
} from "../app_utils/route_paths/resolver/PageRoutes";

const Landing = () => {
  const history = useHistory();
  const [isMenuActive, setMenuActive] = useState(false);
  const menu = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (isMenuActive) {
        removeClass(menu.current, "fadeInDown");
      } else {
        removeClass(menu.current, "menu-active fadeOutUp");
      }
    }, 100);
  }, [isMenuActive]);

  const onMenuButtonClick = (e: Event) => {
    if (isMenuActive) {
      addClass(menu.current, "fadeOutUp");
      setMenuActive(false);
    } else {
      addClass(menu.current, "menu-active fadeInDown");
      setMenuActive(true);
    }
    e.preventDefault();
  };

  const smoothScroll = (id: any) => {
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  };

  const addClass = (element: any, classNames: string) => {
    let classNamesArr = classNames.split(" ");
    for (var i = 0; i < classNamesArr.length; i++) {
      let className = classNamesArr[i];
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    }
  };

  const removeClass = (element: any, classNames: string) => {
    let classNamesArr = classNames.split(" ");
    for (var i = 0; i < classNamesArr.length; i++) {
      let className = classNamesArr[i];
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    }
  };

  return (
    <div className="landing-container">
      <div id="header" className="section flex flex-column">
        <div className="header-menu-container flex align-items-center justify-content-between">
          <button
            className="layout-topbar-logo p-link"
            onClick={() => history.push("/")}
          >
            <img
              src="assets/layout/images/logo.png"
              alt="ultima-layout"
              style={{ height: "70px" }}
            />
          </button>

          <button
            id="menu-button"
            className="lg:hidden p-link"
            onClick={(event: any) => onMenuButtonClick(event)}
          >
            <i className="pi pi-bars fs-xlarge"></i>
          </button>
          <ul ref={menu} id="menu">
            <li>
              <button className="flex p-3 p-link">Home</button>
            </li>
            <li>
              <button
                onClick={() => smoothScroll("#header")}
                className="flex p-3 p-link"
              >
                Introduction
              </button>
            </li>
            <li>
              <button
                onClick={() => smoothScroll("#features")}
                className="flex p-3 p-link"
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => smoothScroll("#promotion")}
                className="flex p-3 p-link"
              >
                Promotion
              </button>
            </li>
            <li>
              <button
                onClick={() => smoothScroll("#pricing")}
                className="flex p-3 p-link"
              >
                Pricing
              </button>
            </li>
            <li>
              <button
                onClick={() => smoothScroll("#video")}
                className="flex pl-3 py-3 p-link"
              >
                Video
              </button>
            </li>
          </ul>
        </div>

        <div className="header-text flex flex-column align-items-center justify-content-center ">
          <h1 className="mb-6 white-color">
            Your All-in-One Church Management Solution
          </h1>

          <Button
            onClick={() => history.push(LOGIN_ROUTE_PATH)}
            type="button"
            label="Login"
            className="p-button-secondary p-button-lg"
          ></Button>
        </div>
      </div>

      <div
        id="features"
        className="section flex flex-column align-items-center"
      >
        <h2>Streamline Church Management with Our SaaS Application</h2>
        <p className="text-center">
          Elevate your church data management experience with our user-friendly,
          secure, and affordable platform. Join the future of digital church
          management today!{" "}
        </p>
      </div>

      <div id="promotion" className="flex flex-column align-items-center">
        <div className="grid m-0 py-3 xl:pl-6">
          <div className="col-12 lg:col-8 flex flex-column justify-content-center align-items-center xl:align-items-center pl-6">
            <h1 className="white-color">
              Ease data management and communication
            </h1>

            <Button
              type="button"
              onClick={() => history.push(REGISTER_ORGANISATION_ROUTE_PATH)}
              className="p-button-raised p-button-lg p-component"
            >
              <span className="p-button-label">Sign Up Now</span>
            </Button>
          </div>
          <div className="col-12 lg:col-4">
            <div className="card mt-3 mb-0">
              <h3>User Friendly</h3>
              <p>
                Our system is user friendly even to people with little computer
                skills. The system can also be managed via a computer, laptop
                and smart phone
              </p>
            </div>

            <div className="card mt-3 mb-0">
              <h3>Reliability: </h3>
              <p>
                Your data is precious. Rest easy with reliable data backups,
                ensuring you never lose critical information.
              </p>
            </div>

            <div className="card my-3">
              <h3>Affordability</h3>
              <p>
                Try our system for a full month with no credit card required.
                After the free trial, enjoy our cost-effective pricing at just
                $9 per month or a discounted annual rate of $90.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="pricing" className="section flex flex-column align-items-center">
        <h2>Pricing</h2>
        <p>
          Try our system for a full month with no credit card required. After
          the free trial, enjoy our cost-effective pricing at just $9 per month
          or a discounted annual rate of $90.
        </p>

        <div className="grid m-0 pricing-content">
          <div className="col-12 xl:col-4">
            <div className="card p-0">
              <div className="flex flex-column align-items-center indigo-bgcolor white-color p-6 fs-large">
                <span>Free</span>
                <h1 className="font-bold">$0</h1>
                <span>One Time</span>
              </div>
              <ul className="options">
                <li>
                  <i className="pi pi-check"></i>
                  <span>Limited Features</span>
                </li>
                <li>
                  <i className="pi pi-check"></i>
                  <span>Limited storage</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 xl:col-4">
            <div className="card p-0">
              <div className="flex flex-column align-items-center pink-bgcolor white-color p-6 fs-large">
                <span>STANDARD</span>
                <h1 className="font-bold">$9</h1>
                <span>Monthly</span>
              </div>
              <ul className="options">
                <li>
                  <i className="pi pi-check"></i>
                  <span>All Features</span>
                </li>

                <li>
                  <i className="pi pi-check"></i>
                  <span>7/24 Support</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 xl:col-4 pricing-box pricing-professional">
            <div className="card p-0">
              <div className="flex flex-column align-items-center cyan-bgcolor white-color p-6 fs-large">
                <span>PROFESSIONAL</span>
                <h1 className="font-bold">$90</h1>
                <span>Yearly</span>
              </div>
              <ul className="options">
                <li>
                  <i className="pi pi-check"></i>
                  <span>All Features</span>
                </li>

                <li>
                  <i className="pi pi-check"></i>
                  <span>7/24 Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        id="video"
        className="section flex flex-column align-items-center justify-content-center"
      >
        <h2>Video</h2>
        <p>
          Our cutting-edge Online Church Information Management System is
          designed to elevate your church experience and streamline your
          administrative tasks. Accessible from any device with an internet
          connection, this platform revolutionizes the way you manage your
          congregation
        </p>
        <div className="m-3">
          <iframe
            src="https://www.youtube.com/embed/B_lYGUtCd0g"
            title="title"
            frameBorder="0"
            className="videoFrame"
          ></iframe>
        </div>
      </div>

      <div
        id="footer"
        className="section flex align-items-center justify-content-between flex-column lg:flex-row"
      >
        <p>Church Saas</p>

        <div className="py-3 flex align-items-center">
          <ul className="my-3 mx-6">
            <li>
              <button type="button" className="p-link">
                Promotion
              </button>
            </li>
            <li>
              <button type="button" className="p-link">
                Pricing
              </button>
            </li>
            <li>
              <button type="button" className="p-link">
                Video
              </button>
            </li>
          </ul>
          <ul className="my-3 ml-3">
            <li>
              <button type="button" className="p-link">
                Home
              </button>
            </li>
            <li>
              <button type="button" className="p-link">
                Introduction
              </button>
            </li>
            <li>
              <button type="button" className="p-link">
                Features
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;
