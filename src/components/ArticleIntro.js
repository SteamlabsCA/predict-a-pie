import React from "react";
import "./Article.scss";

const ArticleIntro = () => {
  return (
    <div className="Article">
      <div className="Article-Nav">
        <ul>
          <li>
            <a href="#predict-a-pie">Predict a Pie Model</a>
          </li>
          <li>
            <a href="#making-simple-decisions">
              Making simple decisions using nodes
            </a>
          </li>
          <li>
            <a href="#negative-and-positive">
              Negative and Positive Connections
            </a>
          </li>
          <li>
            <a href="#weights">Weights</a>
          </li>
        </ul>
      </div>

      <div className="Article-Main">
        <h1 className="big-heading">Intro to Neural Networks</h1>

        <p>
          Artificial intelligence, or AI, is all around us in this modern world.
          AI technology has a range of applications from simply predicting the
          weather to being an integral component in self driving cars. But how
          does AI technology have the ability to perform such a wide array of
          functions? It is made possible through the use of neural networks.
        </p>
        <p>
          Artificial neural networks are a way of expressing AI decision-making.
          Often compared to biological neural networks, artificial neural
          networks in AI process information and gain intelligence through
          learning. While biological neural networks learn through past
          experiences, AI neural networks require training data to learn.
        </p>

        <p>
          Our project predict-a-pie demonstrates how biases occur and how they
          can be reduced within artificial neural networks. The training data
          that an AI receives determines the knowledge that it gains and the
          depth of the neural network created. Depending on where the training
          data is coming from, AI’s can be biased on the way they operate. By
          allowing more people to assist in an AI’s training, the amount of
          training data an AI receives increases, decreasing the chance of
          sigificant biases.
        </p>

        <h4 id="predict-a-pie">Predict a Pie Model</h4>
        <p>
          Through the predict-a-pie model, anyone can easily learn how neural
          networks function! Neural networks can be incredibly large but,
          ultimately they must consist of at least two layers, an input and an
          output. In between these two layers can be multiple hidden layers and
          within each layer there are nodes. The input layer represents the
          information that can be used to find the solution to the problem, the
          hidden layer(s) represents finding patterns that help lead towards the
          solution, and the output layer is the final decision or solution to
          our problem!
        </p>
        <img src="" />

        <h4 id="making-simple-decisions">
          Making simple decisions using nodes
        </h4>
        <p>
          Each node within the hidden layer is a decision being made. Here we
          can see the input layer (in our case ingredients) containing cherries,
          sugar and crust connecting to the output layer (in our case recipes)
          which is a sweet pie. Here the AI has learned that these ingredients
          together create a sweet pie.
        </p>
        <img src="" />

        <h4 id="negative-and-positive">Negative and Positive Connections</h4>
        <p>
          When another node is added in the input layers (another ingredient) we
          must choose how it is related to a sweet pie. If I choose to teach the
          AI that cheese does not belong in a sweet pie, but that it belongs on
          a pizza pie then it should be negatively associated with the sweet pie
          node and positively associated with a pizza pie node.
        </p>
        <img src="" />
        <p>
          Now, when the input node (ingredient) of cheese is activated (turned
          on) the AI will know that the type of pie being made cannot be sweet.
          However, if the input node (ingredient) of cheese is deactivated, or
          turned off the AI now knows that the type of pie being made could
          potentially be sweet, but could not be a pizza pie.
        </p>
        <img src="" />

        <h4 id="weights">Weights</h4>
        <p>
          When hidden layers are added, so are more nodes, thus more decisions
          are being made. Adding more hidden layers gives the AI additional
          tools to make complex decisions. Here we can connect all the
          ingredients that go into a sweet filling together and the ingredients
          that go into a pizza pie together, while also making sure that we keep
          in mind the negative and positive associations.
        </p>
        <img src="" />
        <p>
          As you can see there are multiple ingredients that go into a sweet
          filling, however they might not all be used together in the same
          recipe. This is where weights can be used to reach the desired recipe
          (output). Currently everything is weighed the same, meaning that all
          ingredients need to be turned on to activate a desired output
          (recipe). We can manually change the weights so ingredients (inputs),
          such as blueberries and cherries, can be turned on independently of
          one another and still achieve a sweet pie (output). Weights can be
          used to determine how important an ingredient (input) is to a recipe
          (output), for example in a sweet pie sugar and crust (ingredients
          integral to a sweet pie) would outweigh cherries (which can be
          optional). It is important to know that when activated all weights
          must add up to 100, anything less and the output will not be
          activated. Weights, like nodes, help the AI make more complex
          decisions.{" "}
        </p>
        <img src="" />
      </div>
    </div>
  );
};

export default ArticleIntro;
