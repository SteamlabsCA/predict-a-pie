import React from "react";
import "./LandingPage.scss";
import Hero from "./Hero";
import Button from "./Button";
import david from "../assets/david.png";
import stew from "../assets/stew.png";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <Hero />

      <div className="MainSection">
        <div className="Beginning">
          <div className="Beginning-left">
            <h2>Let’s start from the beginning...</h2>
            <h4 className="box-title">Intro to Neural Networks</h4>
            <p className="box-description">
              Totally brand new? Take a look at the concept and building blocks
              of Artificial Intelligence (AI) and how it is able to make
              predictions using a neural network.
            </p>
            <Button>READ ARTICLE</Button>
          </div>

          <div className="Beginning-right">
            <img src="" />
          </div>
        </div>

        <div className="Articles">
          <h2>Let's go deeper!</h2>
          <div className="Articles-contents">
            <div className="Articles-indigenous">
              <div className="Articles-indigenous-left">
                <img src="" />
                <img src="" />
                <div></div>
              </div>
              <div className="Articles-indigenous-right">
                <h4>
                  Indigenous Cooking with a <em>dash</em> of AI
                </h4>
                <p>
                  Learn about Indigenous-fusion cooking practices from Xaxli’p
                  First Nation chef, David Wolfman and how to use an AI Neural
                  Network simulator to generate new recipes for a restaurant!
                  You will learn about how data can be biased and how excluding
                  cooking from a wide array of cultures can have negative
                  impacts.
                </p>
                <Button>READ ARTICLE</Button>
              </div>
            </div>
            <div className="Articles-columns">
              <div className="Articles-columns-weird">
                <h4> AI Weirdness</h4>
                <p>asff</p>

                <Button>READ ARTICLE</Button>
              </div>
              <div className="Articles-columns-prime">
                <h4>Recommendation engine AI with Prime Video</h4>
                <p>
                  Learn how the Amazon Prime Video recommendation engine works
                  using Neural Networks!
                </p>

                <Button>READ ARTICLE</Button>
              </div>
            </div>
            <div className="Articles-non-computer">
              <h4>
                Neural Networks for your non-computer science classroom subject
              </h4>
              <p>
                The idea of Artificial Intelligence (AI) often conjures up ideas
                related to science fiction or of an individual mashing the
                keyboard, working on some complex algorithm. However, we hope to
                challenge some of these notions and highlight potential areas in
                which AI could be adopted into different areas of an education
                curriculum.
              </p>
              <Button>READ ARTICLE</Button>
            </div>
          </div>
        </div>

        <div className="Educators"></div>

        <div className="FunPart">
          <h2>Now for the FUN part!</h2>
        </div>

        <div className="AboutApp">
          <h2>About this app</h2>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
