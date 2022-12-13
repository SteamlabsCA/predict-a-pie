import "./MobileNav.scss";
import React from "react";
import PretrainedNav from "./PretrainedNav";
import TryAiNav from "./TryAiNav";
import ForEducatorNav from "./ForEducatorNav";
import gtmTrack from "../helpers/gtmTrack";
import menu from "../assets/menu.svg";
import { Link } from "react-router-dom";
import { strings } from "./App";

const dropdownStyle = { left: "3rem" };

function Nav({ appData, onCommand, ...props }) {
  const [openTryAi, setOpenTryAi] = React.useState(false);
  const [openForEdu, setOpenForEdu] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const onClick = (event) => {
    if (!event.target.className.includes("stayOpen")) {
      setOpen(!open);
    }
  };

  return (
    <div className={open ? "Nav Nav-open" : "Nav Nav-closed"} onClick={onClick}>
      <button className="Nav-toggle">
        <img src={menu} alt="Menu icon" />
      </button>
      <nav className="Nav-menu">
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
          dropdownStyle={dropdownStyle}
        />
        <ForEducatorNav
          appData={appData}
          onCommand={onCommand}
          open={openForEdu}
          setOpen={setOpenForEdu}
          anotherNavOpen={openTryAi}
          setAnotherNavOpen={setOpenTryAi}
          dropdownStyle={dropdownStyle}
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
    </div>
  );
}

export default Nav;
