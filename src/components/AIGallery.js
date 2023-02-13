import React, { useEffect, useRef } from "react";
import "./AIGallery.scss";
import { Link } from "react-router-dom";
import gtmTrack from "../helpers/gtmTrack";
import Button from "./Button";
import astronaut from "../assets/ai-gallery-astronaut.png"
import clover from "../assets/ai-gallery-clover.png"
import comingSoon from "../assets/ai-gallery-comingsoon.png"
import galaxy from "../assets/ai-gallery-galaxy.png"
import plants from "../assets/ai-gallery-plants.png"
import tigers from "../assets/ai-gallery-tiger.png"

const AIGallery = ({ appData }) => {
//   const predict = useRef(null);
//   const making = useRef(null);
//   const negative = useRef(null);
//   const weights = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="GalleryMain">
        <div className="Gallery">
            <h2>AI Gallery</h2>
            <h6>Explore other neural networks folks like you have created! Expand on these networks by adding your own nodes and connections.</h6>
            <div className="columns">
                <div className="tile">
                    <img src={plants} />

                    <div>
                        <h4>Kitchen Scraps </h4>
                        <p>
                        Predict whether your table scraps should be composted, planted, and thrown out!

                        </p>
                    </div>
                    <a href="https://nn.inventor.city/build/1962655786"><Button>Remix!</Button></a>
                    
                </div>
                <div className="tile">
                    <img src={tigers} />

                    <div>
                        <h4>What Animal is it?</h4>
                        <p>
                        I have stripes, fur, and claws! What animal an I?
                        </p>
                    </div>
                    <a href="https://nn.inventor.city/build/1861794544"><Button>Remix!</Button></a>
                </div>
                <div className="tile">
                    <img src={clover} />

                    <div>
                        <h4>Can I bring this plant to space?</h4>
                        <p>
                        We’re going on a space exploration - but what are we going to eat?! Find out what plants are ideal to bring to space to grow and eat!
                        </p>
                    </div>
                    <a href="https://nn.inventor.city/build/1622355080"><Button>Remix!</Button></a>
                </div>
                <div className="tile">
                    <img src={galaxy} />

                    <div>
                        <h4>Planet Classification</h4>
                        <p>
                        Create a Neural Network that is able to correctly identify the planets in our solar system given specific conditions.
                        </p>
                    </div>
                    <a href="https://nn.inventor.city/build/_1743167159"><Button>Remix!</Button></a>
                </div>
                <div className="tile">
                    <img src={astronaut} />

                    <div>
                        <h4>Flight Crew</h4>
                        <p>
                        Are you ready to explore the galaxy? You’re going to be in charge of assembling a team of 4 astronauts for a new crewed mission aboard the Lunar Gateway space station.
                        </p>
                    </div>
                    <a href="https://nn.inventor.city/build/352108882"><Button>Remix!</Button></a>
                </div>
                <div className="tile">
                    <img src={comingSoon} />

                    <div>
                        <h4>Coming Soon!</h4>
                        <p>
                        Stay tune for more neural networks...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AIGallery;