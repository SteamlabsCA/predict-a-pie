import "./NewNav.scss";
import React from "react";
import PretrainedNav from "./PretrainedNav";
import TryAiNav from "./TryAiNav";
import ForEducatorNav from "./ForEducatorNav";
import gtmTrack from "../helpers/gtmTrack";
import menu from "../assets/menu.svg";
import { Link } from "react-router-dom";
import { strings } from "./App";

function Nav({ appData, onCommand, ...props }) {
  const [openTryAi, setOpenTryAi] = React.useState(false);
  const [openForEdu, setOpenForEdu] = React.useState(false);

  //   const [menuStyle, setMenuStyle] = React.useState();
  //   const onClick = (event) => {
  //     if (!event.target.className.includes("stayOpen")) {
  //       setOpen(!open);
  //       setMenuStyle({
  //         left: event.clientX - 5 + "px",
  //         top: event.clientY - 5 + "px",
  //       });
  //     }
  //   };

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
        {/* <Link
          onClick={() => gtmTrack("prm_btn_click", "Build", "Build", "")}
          to={appData.classroom ? `/${appData.classroom.code}/build` : "/build"}
        >
          {strings.buildNetwork}
        </Link>
        <PretrainedNav appData={appData} mainOpen={open} />
        <Link
          onClick={() =>
            gtmTrack("prm_btn_click", "ClassStats", "ClassStats", "")
          }
          to={appData.classroom ? `/${appData.classroom.code}/stats` : ""}
          disabled={!appData.classroom}
        >
          {strings.viewStats}
        </Link>
        <hr />
        {appData.classroom && (
          <>
            <a
              onClick={() => {
                props.onCommand("leave-classroom");
                gtmTrack("sec_btn_click", "Class", "Leave Class", "");
              }}
              disabled={!appData.connected}
            >
              {strings.leaveClassroom}
            </a>
          </>
        )}
        {!appData.classroom && (
          <>
            <a
              onClick={() => {
                props.onCommand("join-classroom");
                gtmTrack("sec_btn_click", "Class", "Join Class", "");
              }}
              disabled={!appData.connected}
            >
              {strings.joinClassroom}
            </a>
            <a
              onClick={() => {
                props.onCommand("create-classroom");
                gtmTrack("sec_btn_click", "Class", "Create Class", "");
              }}
              disabled={!appData.connected}
            >
              {strings.createClassroom}
            </a>
          </>
        )}
        <hr />
        {strings.getLanguage() == "en" && (
          <>
            <a
              onClick={() => {
                props.onCommand("french");
                gtmTrack("sec_btn_click", "Language", "French", "");
              }}
            >
              {strings.french}
            </a>
          </>
        )}
        {strings.getLanguage() == "fr" && (
          <>
            <a
              onClick={() => {
                props.onCommand("english");
                gtmTrack("sec_btn_click", "Language", "English", "");
              }}
            >
              {strings.english}
            </a>
          </>
        )} */}
      </nav>
    </>
  );
}

export default Nav;
