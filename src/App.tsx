import React, { useEffect, useRef, useState } from "react";
import { classNames } from "primereact/utils";
import { Route, useLocation } from "react-router-dom";

import AppTopbar from "./AppTopbar";
import AppInlineMenu from "./AppInlineMenu";
import AppFooter from "./AppFooter";
import AppMenu from "./AppMenu";
import AppConfig from "./AppConfig";
import AppRightMenu from "./AppRightMenu";

import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.scss";
import { ID_LAYOUT_CONTENT, KEY_BEARER_TOKEN, KEY_SELECTED_APPLICATION_MODULE } from "./app_utils/constants/Constants";
import { MainFrontendRoutes } from "./app_utils/route_paths/resolver/MainFrontendRoutes";
import Login from "./pages/Login";

export const RTLContext = React.createContext(false);

const App = () => {
  const [menuMode, setMenuMode] = useState("static");
  const [inlineMenuPosition, setInlineMenuPosition] = useState("bottom");
  const [desktopMenuActive, setDesktopMenuActive] = useState(true);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [activeTopbarItem, setActiveTopbarItem] = useState(null);
  const [colorMode, setColorMode] = useState("light");
  const [rightMenuActive, setRightMenuActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [inputStyle, setInputStyle] = useState("filled");
  const [isRTL, setRTL] = useState<boolean>(false);
  const [ripple, setRipple] = useState(true);
  const [mobileTopbarActive, setMobileTopbarActive] = useState(false);
  const [menuTheme, setMenuTheme] = useState("light");
  const [topbarTheme, setTopbarTheme] = useState("blue");
  const [theme, setTheme] = useState("indigo");
  const [isInputBackgroundChanged, setIsInputBackgroundChanged] = useState(false);
  const [inlineMenuActive, setInlineMenuActive] = useState<any>({});
  const [newThemeLoaded, setNewThemeLoaded] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  let currentInlineMenuKey = useRef("");
  const copyTooltipRef = useRef<any>();
  const location = useLocation();

  PrimeReact.ripple = true;

  let searchClick: boolean;
  let topbarItemClick: boolean;
  let menuClick: boolean;
  let inlineMenuClick: boolean;
  var frontEndRoutes = new MainFrontendRoutes(localStorage.getItem(KEY_SELECTED_APPLICATION_MODULE)!);

  const token = localStorage.getItem(KEY_BEARER_TOKEN);
  const menu = token ? frontEndRoutes.getMainNavigationMenu() : frontEndRoutes.getMainUnAuthenticatedNavigationMenu();
  const routes = token ? frontEndRoutes.getAuthenticatedComponentRouters() : frontEndRoutes.getUnAuthenticatedComponetRouters();

  useEffect(() => {
    copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
  }, [location]);

  useEffect(() => {
    if (menuMode === "overlay") {
      hideOverlayMenu();
    }
    if (menuMode === "static") {
      setDesktopMenuActive(true);
    }
  }, [menuMode]);

  useEffect(() => {
    onColorModeChange(colorMode);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onMenuThemeChange = (theme: string) => {
    setMenuTheme(theme);
  };

  const onTopbarThemeChange = (theme: string) => {
    setTopbarTheme(theme);
  };

  const onThemeChange = (theme: string) => {
    setTheme(theme);
    const themeLink = document.getElementById("theme-css");
    const themeHref = "assets/theme/" + theme + "/theme-" + colorMode + ".css";
    replaceLink(themeLink, themeHref);
  };

  const onColorModeChange = (mode: string) => {
    setColorMode(mode);
    setIsInputBackgroundChanged(true);

    if (isInputBackgroundChanged) {
      if (mode === "dark") {
        setInputStyle("filled");
      } else {
        setInputStyle("outlined");
      }
    }

    if (mode === "dark") {
      setMenuTheme("dark");
      setTopbarTheme("dark");
    } else {
      setMenuTheme("light");
      setTopbarTheme("blue");
    }

    const layoutLink = document.getElementById("layout-css");
    const layoutHref = "assets/layout/css/layout-" + mode + ".css";
    replaceLink(layoutLink, layoutHref);

    const themeLink = document.getElementById("theme-css") as HTMLInputElement;
    const urlTokens = (themeLink.getAttribute("href") as String).split("/");
    urlTokens[urlTokens.length - 1] = "theme-" + mode + ".css";
    const newURL = urlTokens.join("/");

    replaceLink(themeLink, newURL, () => {
      setNewThemeLoaded(true);
    });
  };

  const replaceLink = (linkElement: any, href: string, callback?: any) => {
    if (isIE()) {
      linkElement.setAttribute("href", href);

      if (callback) {
        callback();
      }
    } else {
      const id = linkElement.getAttribute("id");
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute("href", href);
      cloneLinkElement.setAttribute("id", id + "-clone");

      linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

      cloneLinkElement.addEventListener("load", () => {
        linkElement.remove();
        cloneLinkElement.setAttribute("id", id);

        if (callback) {
          callback();
        }
      });
    }
  };

  const onInputStyleChange = (inputStyle: string) => {
    setInputStyle(inputStyle);
  };

  const onRipple = (e: any) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };

  const onInlineMenuPositionChange = (mode: string) => {
    setInlineMenuPosition(mode);
  };

  const onMenuModeChange = (mode: string) => {
    setMenuMode(mode);
  };

  const onRTLChange = () => {
    setRTL((prevState) => !prevState);
  };

  const onMenuClick = (event: any) => {
    menuClick = true;
  };

  const onMenuButtonClick = (event: Event) => {
    menuClick = true;

    if (isDesktop()) setDesktopMenuActive((prevState) => !prevState);
    else setMobileMenuActive((prevState) => !prevState);

    event.preventDefault();
  };

  const onTopbarItemClick = (event: any) => {
    topbarItemClick = true;
    if (activeTopbarItem === event.item) setActiveTopbarItem(null);
    else {
      setActiveTopbarItem(event.item);
    }

    event.originalEvent.preventDefault();
  };

  const onSearch = (event: any) => {
    searchClick = true;
    setSearchActive(event);
  };

  const onMenuItemClick = (event: any) => {
    if (!event.item.items && (menuMode === "overlay" || !isDesktop())) {
      hideOverlayMenu();
    }

    if (!event.item.items && (isHorizontal() || isSlim())) {
      setMenuActive(false);
    }
  };

  const onRootMenuItemClick = (event: any) => {
    setMenuActive((prevState) => !prevState);
  };

  const onRightMenuButtonClick = () => {
    setRightMenuActive((prevState) => !prevState);
  };

  const onMobileTopbarButtonClick = (event: any) => {
    setMobileTopbarActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onDocumentClick = (event: any) => {
    if (!searchClick && event.target.localName !== "input") {
      setSearchActive(false);
    }

    if (!topbarItemClick) {
      setActiveTopbarItem(null);
    }

    if (!menuClick && (menuMode === "overlay" || !isDesktop())) {
      if (isHorizontal() || isSlim()) {
        setMenuActive(false);
      }
      hideOverlayMenu();
    }

    if (inlineMenuActive[currentInlineMenuKey.current] && !inlineMenuClick) {
      let menuKeys = { ...inlineMenuActive };
      menuKeys[currentInlineMenuKey.current] = false;
      setInlineMenuActive(menuKeys);
    }

    if (!menuClick && (isSlim() || isHorizontal())) {
      setMenuActive(false);
    }

    searchClick = false;
    topbarItemClick = false;
    inlineMenuClick = false;
    menuClick = false;
  };

  const hideOverlayMenu = () => {
    setMobileMenuActive(false);
    setDesktopMenuActive(false);
  };

  const isDesktop = () => {
    return window.innerWidth > 1024;
  };

  const isHorizontal = () => {
    return menuMode === "horizontal";
  };

  const isSlim = () => {
    return menuMode === "slim";
  };

  const isIE = () => {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  };

  const onInlineMenuClick = (e: any, key: any) => {
    let menuKeys = { ...inlineMenuActive };
    if (key !== currentInlineMenuKey.current && currentInlineMenuKey.current) {
      menuKeys[currentInlineMenuKey.current] = false;
    }

    menuKeys[key] = !menuKeys[key];
    setInlineMenuActive(menuKeys);
    currentInlineMenuKey.current = key;
    inlineMenuClick = true;
  };

  const layoutContainerClassName = classNames("layout-wrapper ", "layout-menu-" + menuTheme + " layout-topbar-" + topbarTheme, {
    "layout-menu-static": menuMode === "static",
    "layout-menu-overlay": menuMode === "overlay",
    "layout-menu-slim": menuMode === "slim",
    "layout-menu-horizontal": menuMode === "horizontal",
    "layout-menu-active": desktopMenuActive,
    "layout-menu-mobile-active": mobileMenuActive,
    "layout-topbar-mobile-active": mobileTopbarActive,
    "layout-rightmenu-active": rightMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": !ripple,
    "layout-rtl": isRTL,
  });
  if (!token) {
    return <Login />;
  }

  return (
    <RTLContext.Provider value={isRTL}>
      <div className={layoutContainerClassName} onClick={onDocumentClick}>
        <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

        <AppTopbar
          horizontal={isHorizontal()}
          activeTopbarItem={activeTopbarItem}
          onMenuButtonClick={onMenuButtonClick}
          onTopbarItemClick={onTopbarItemClick}
          onRightMenuButtonClick={onRightMenuButtonClick}
          onMobileTopbarButtonClick={onMobileTopbarButtonClick}
          mobileTopbarActive={mobileTopbarActive}
          searchActive={searchActive}
          onSearch={onSearch}
        />

        <div className="menu-wrapper" onClick={onMenuClick}>
          <div className="layout-menu-container">
            {(inlineMenuPosition === "top" || inlineMenuPosition === "both") && (
              <AppInlineMenu menuKey="top" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />
            )}
            <AppMenu model={menu} onMenuItemClick={onMenuItemClick} onRootMenuItemClick={onRootMenuItemClick} menuMode={menuMode} active={menuActive} />
            {(inlineMenuPosition === "bottom" || inlineMenuPosition === "both") && (
              <AppInlineMenu menuKey="bottom" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />
            )}
          </div>
        </div>

        <div className="layout-main">
          <div id={ID_LAYOUT_CONTENT} className="layout-content">
            {console.log(JSON.stringify(routes))}
            {routes.map((router, index) => {
              if (router.exact) {
                return <Route key={`router${index}`} path={router.path} exact component={router.component} />;
              }

              return <Route key={`router${index}`} path={router.path} component={router.component} />;
            })}
          </div>
          <AppFooter colorMode={colorMode} />
        </div>

        <AppConfig
          inputStyle={inputStyle}
          onInputStyleChange={onInputStyleChange}
          rippleEffect={ripple}
          onRippleEffect={onRipple}
          menuMode={menuMode}
          onMenuModeChange={onMenuModeChange}
          inlineMenuPosition={inlineMenuPosition}
          onInlineMenuPositionChange={onInlineMenuPositionChange}
          colorMode={colorMode}
          onColorModeChange={onColorModeChange}
          menuTheme={menuTheme}
          onMenuThemeChange={onMenuThemeChange}
          topbarTheme={topbarTheme}
          onTopbarThemeChange={onTopbarThemeChange}
          theme={theme}
          onThemeChange={onThemeChange}
          isRTL={isRTL}
          onRTLChange={onRTLChange}
        />

        <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuButtonClick={onRightMenuButtonClick} />

        {mobileMenuActive && <div className="layout-mask modal-in"></div>}
      </div>
    </RTLContext.Provider>
  );
};

export default App;
