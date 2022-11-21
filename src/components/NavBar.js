import React from "react";
import "./NavBar.scss";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { useParams } from "react-router-dom";

function NavBar({ title, content, appData, checkEnv, envVariables, ...props }) {
  const isMountedRef = React.useRef(null);
  let { id } = useParams();
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1119;

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    isMountedRef.current = true;
    if (isMountedRef.current && checkEnv) {
      checkEnv();
    }
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <header className={width < breakpoint ? "NavBar NavBar-mobile" : "NavBar"}>
      {width < breakpoint ? (
        <MobileNav
          appData={appData}
          route={props.route}
          onCommand={props.onCommand}
        />
      ) : (
        <DesktopNav
          appData={appData}
          route={props.route}
          onCommand={props.onCommand}
        />
      )}

      {envVariables && content && (
        <div
          className={
            width < breakpoint ? "NavBar-NN NavBar-NN-mobile" : "NavBar-NN"
          }
        >
          <h1>
            {title === "customPretrain"
              ? `Test Chef ${
                  id.charAt(0).toUpperCase() + id.slice(1)
                }'s Pretrained Network`
              : title}
          </h1>
          <div>{content}</div>
        </div>
      )}
      {title === "customPretrain" && (
        <div className="NavBar-NN">
          <h1>
            {title === "customPretrain"
              ? `Test Chef ${
                  id.charAt(0).toUpperCase() + id.slice(1)
                }'s Pretrained Network`
              : title}
          </h1>
        </div>
      )}
    </header>
  );
}

export default NavBar;
