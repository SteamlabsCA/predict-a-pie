import "./DesktopNav.scss";
import React from "react";
import TryAiNav from "./TryAiNav";
import ForEducatorNav from "./ForEducatorNav";
import gtmTrack from "../helpers/gtmTrack";

function DesktopNav({ appData, onCommand, ...props }) {
  const [openTryAi, setOpenTryAi] = React.useState(false);
  const [openForEdu, setOpenForEdu] = React.useState(false);

  return (
    <>
      <nav className="Nav">
        <a
          onClick={() =>
            gtmTrack("prm_btn_click", "Instructions", "Instructions", "")
          }
          href={
            appData.classroom
              ? `/${appData.classroom.code}/#HowAIWorks`
              : "/#HowAIWorks"
          }
        >
          LEARN HOW AI WORKS
        </a>
        <TryAiNav
          appData={appData}
          onCommand={onCommand}
          open={openTryAi}
          setOpen={setOpenTryAi}
          anotherNavOpen={openForEdu}
          setAnotherNavOpen={setOpenForEdu}
        />
        <ForEducatorNav
          appData={appData}
          onCommand={onCommand}
          open={openForEdu}
          setOpen={setOpenForEdu}
          anotherNavOpen={openTryAi}
          setAnotherNavOpen={setOpenTryAi}
        />
        <a
          onClick={() =>
            gtmTrack("prm_btn_click", "Instructions", "Instructions", "")
          }
          href={
            appData.classroom ? `/${appData.classroom.code}/#About` : "/#About"
          }
        >
          ABOUT
        </a>
      </nav>
    </>
  );
}

export default DesktopNav;
