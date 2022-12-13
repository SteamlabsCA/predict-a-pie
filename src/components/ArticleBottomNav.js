import React from "react";
import "./ArticleBottomNav.scss";
import gtmTrack from "../helpers/gtmTrack";
import { Link } from "react-router-dom";

const ArticleBottomNav = ({ appData }) => {
  const hrefArray = window.location.href.split("/");
  const articleLink = hrefArray[hrefArray.length - 1];
  console.log(articleLink);

  console.log(window.location.href);
  return (
    <div className="BottomNav">
      <h2>Further Reading...</h2>

      <p>
        <strong>Articles:</strong>
      </p>

      <Link
        onClick={() =>
          gtmTrack("prm_btn_click", "Article", "Intro to Neural Networks", "")
        }
        to={
          appData.classroom
            ? `/${appData.classroom.code}/article/intro-to-neural-networks`
            : "/article/intro-to-neural-networks"
        }
        style={
          articleLink === "intro-to-neural-networks"
            ? { display: "none" }
            : { display: "inline-block" }
        }
      >
        <p>Intro to Neural Networks</p>
      </Link>

      <p>Indigenous Cooking with a dash of AI</p>
      <p>AI Weirdness</p>
      <p>AI Video Recommendation engine</p>

      <Link
        onClick={() =>
          gtmTrack(
            "prm_btn_click",
            "Article",
            "Neural Networks for Your Non-Computer Science Classroom Subject",
            ""
          )
        }
        to={
          appData.classroom
            ? `/${appData.classroom.code}/article/non-computer-science-classroom`
            : "/article/non-computer-science-classroom"
        }
        style={
          articleLink === "non-computer-science-classroom"
            ? { display: "none" }
            : { display: "inline-block" }
        }
      >
        <p>Neural Networks For Your Non-Computer Science Classroom Subject</p>
      </Link>
    </div>
  );
};

export default ArticleBottomNav;
