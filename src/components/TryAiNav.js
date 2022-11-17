import "./DropdownNav.scss";
import React from "react";
import pretrainedModels from "../pretrainedModels.json";
import gtmTrack from "../helpers/gtmTrack";
import { Link } from "react-router-dom";
import { strings } from "./App";

function DropdownNav({
  appData,
  onCommand,
  open,
  setOpen,
  anotherNavOpen,
  setAnotherNavOpen,
}) {
  let models = pretrainedModels.Models;

  //   const [open, setOpen] = React.useState(false);
  const [menuStyle, setMenuStyle] = React.useState();

  return (
    <div className="DropdownNav">
      <div
        className="DropdownNav-open stayOpen"
        onClick={(event) => {
          setOpen(!open);
          if (anotherNavOpen) {
            setAnotherNavOpen(!anotherNavOpen);
          }
          //   setMenuStyle({
          //     left: event.clientX + 10 + "px",
          //     top: event.clientY - 5 + "px",
          //   });
        }}
      >
        TRY AN AI
      </div>
      <div
        className={open ? "DropdownNav-menu open" : "DropdownNav-menu closed"}
        // style={menuStyle}
      >
        {open && (
          <>
            <Link
              onClick={() =>
                gtmTrack("prm_btn_click", "Pretrained", "Predict a Pie", "")
              }
              to={
                appData.classroom
                  ? `/${appData.classroom.code}/trained`
                  : "/trained"
              }
            >
              PREDICT A PIE
            </Link>

            <Link
              onClick={() =>
                gtmTrack(
                  "prm_btn_click",
                  "Pretrained",
                  "Chef David Wolfman",
                  ""
                )
              }
              to={
                appData.classroom
                  ? `/${appData.classroom.code}/trained/wolfman`
                  : "/trained/wolfman"
              }
            >
              INDIGENOUS FUSION
            </Link>
            <Link
              onClick={() => gtmTrack("prm_btn_click", "Build", "Build", "")}
              to={
                appData.classroom
                  ? `/${appData.classroom.code}/build`
                  : "/build"
              }
            >
              BUILD YOUR OWN NEURAL NETWORK
            </Link>

            {appData.classroom && (
              <>
                <a
                  onClick={() => {
                    props.onCommand("leave-classroom");
                    gtmTrack("sec_btn_click", "Class", "Leave Class", "");
                  }}
                  disabled={!appData.connected}
                >
                  LEAVE CLASSROOM
                </a>
              </>
            )}

            {!appData.classroom && (
              <a
                onClick={() => {
                  onCommand("join-classroom");
                  gtmTrack("sec_btn_click", "Class", "Join Class", "");
                }}
                disabled={!appData.connected}
              >
                JOIN A CLASSROOM
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DropdownNav;
