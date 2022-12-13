import "./DropdownNav.scss";
import React from "react";
import gtmTrack from "../helpers/gtmTrack";

function DropdownNav({
  appData,
  onCommand,
  open,
  setOpen,
  anotherNavOpen,
  setAnotherNavOpen,
  dropdownStyle,
}) {
  return (
    <div className="DropdownNav">
      <div
        className="DropdownNav-open stayOpen"
        onClick={() => {
          setOpen(!open);
          if (anotherNavOpen) {
            setAnotherNavOpen(!anotherNavOpen);
          }
        }}
      >
        FOR EDUCATOR
      </div>
      <div
        className={open ? "DropdownNav-menu open" : "DropdownNav-menu closed"}
        style={dropdownStyle && dropdownStyle}
      >
        {open && (
          <>
            <a
              onClick={() =>
                gtmTrack(
                  "out_btn_click",
                  "LandingPage",
                  "Out Bound: https://kidscodejeunesse.org/data/resources/resources_files/en/ai_algo/Cooking_with_Neural_Networks.pdf",
                  "https://kidscodejeunesse.org/data/resources/resources_files/en/ai_algo/Cooking_with_Neural_Networks.pdf"
                )
              }
              href="https://kidscodejeunesse.org/data/resources/resources_files/en/ai_algo/Cooking_with_Neural_Networks.pdf"
              target="_new"
            >
              LESSON PLAN
            </a>

            <a
              onClick={() => {
                onCommand("create-classroom");
                gtmTrack("sec_btn_click", "Class", "Create Class", "");
              }}
              disabled={
                !appData.connected ? true : appData.classroom ? true : false
              }
            >
              CREATE A CLASSROOM
            </a>

            <a
              onClick={() =>
                gtmTrack(
                  "out_btn_click",
                  "LandingPage",
                  "Out Bound: https://kidscodejeunesse.org/teacher-training?eventGroupType=kcj_educators",
                  "https://kidscodejeunesse.org/teacher-training?eventGroupType=kcj_educators"
                )
              }
              href="https://kidscodejeunesse.org/teacher-training?eventGroupType=kcj_educators"
              target="_new"
            >
              BOOK TEACHER TRAINING
            </a>

            <a
              onClick={() =>
                gtmTrack(
                  "out_btn_click",
                  "LandingPage",
                  "Out Bound: https://kidscodejeunesse.org/code-in-the-classroom?p=all&l=en&g=all",
                  "https://kidscodejeunesse.org/code-in-the-classroom?p=all&l=en&g=all"
                )
              }
              href="https://kidscodejeunesse.org/code-in-the-classroom?p=all&l=en&g=all"
              target="_new"
            >
              BOOK A CLASSROOM VISIT
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default DropdownNav;
