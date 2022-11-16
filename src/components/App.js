import "./App.scss";
import Alert from "./Alert";
import ClassroomCode from "./ClassroomCode";
import SharePrompt from "./SharePrompt";
import Backdrop from "./Backdrop";
import Instructions from "./Instructions";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import Network from "./Network";
import Prompt from "./Prompt";
import Reclassify from "./Reclassify";
import SelectRecipe from "./SelectRecipe";
import Stats from "./Stats";
import TrainedNetwork from "./TrainedNetwork";
import TrainedChefNetwork from "./TrainedChefNetwork";
import TrainedNetworkInstructionPopup from "./TrainedNetworkInstructionPopup";
import gtmTrack from "../helpers/gtmTrack";
import nnToJSON from "../helpers/nnToJSON";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LocalizedStrings from "react-localization";
import socketClient from "socket.io-client";

import ingredients from "../ingredients/ingredients.json";
import classifications from "../ingredients/classifications.json";
import stringData from "../strings.json";
import ArticleIntro from "./ArticleIntro";
const strings = new LocalizedStrings(stringData);

export { ingredients, classifications, strings };

let socket;

if (process.env.NODE_ENV === "development") {
  socket = socketClient("http://localhost:8080");
} else if (process.env.NODE_ENV === "staging") {
  socket = socketClient("http://0.0.0.0:8080");
} else if (process.env.NODE_ENV === "production") {
  socket = socketClient(`https://${window.location.hostname}`);
}

// Classroom code specified in URL
const url = window.location.pathname.split("/");
if (url[1] && !["build", "trained", "stats"].includes(url[1])) {
  socket.emit("join-classroom", url[1]);
}

function App(props) {
  const [appData, setAppData] = React.useState({
    connected: false,
    classroom: false,
    userId: false,
  });
  const [classroomCode, setClassroomCode] = React.useState(false);
  const [recipe, setRecipe] = React.useState(new Array(28).fill(0));
  const [lastFoundRecipe, setLastFoundRecipe] = React.useState(-1);
  const [recipes, setRecipes] = React.useState([]);
  const [discuss, setDiscuss] = React.useState(true);
  const [classification, setClassification] = React.useState(0);
  const [reclassify, setReclassify] = React.useState(false);
  const [reclassifyTimeout, setReclassifyTimeout] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);
  const [buildNetwork, setBuildNetwork] = React.useState({
    network: false,
    connections: false,
    id: "",
    urlId: "",
    url: "",
    visible: false,
  });
  const [retrievedNetwork, setRetrievedNetwork] = React.useState({
    network: false,
    connections: false,
  });
  const [envVariables, setEnvVariables] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [instructionId, setInstructionId] = useState();
  const [disableFindRecipe, setDisableFindRecipe] = useState(true);

  // Receive from socket
  React.useEffect(() => {
    socket.on("connect", () => {
      appData.connected = true;
      setAppData({ ...appData });
    });

    socket.on("disconnect", () => {
      appData.connected = false;
      setAppData({ ...appData });
    });

    socket.on("user-id", (userId) => {
      appData.userId = userId;
      setAppData({ ...appData });
    });

    socket.on("classroom-created", (code) => {
      setClassroomCode(code);
      window.history.pushState("", "", "/" + code);
    });

    socket.on("classroom-joined", (code) => {
      window.history.pushState("", "", "/" + code);
    });

    socket.on("classroom-updated", (classroom) => {
      appData.classroom = classroom;
      setAppData({ ...appData });
    });

    socket.on("error", (error) => {
      alert(error, "error");
    });
  }, []);

  //  Load pre-generated recipes
  const getRecipe = (name) => {
    fetch(`/models/${name}/recipes.json`)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        // Shuffle recipes
        for (let i = json.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [json[i], json[j]] = [json[j], json[i]];
        }
        setRecipes(json);
      });
  };

  const onCommand = (command) => {
    switch (command) {
      case "join-classroom":
        prompt(strings.enterClassroomCode).then((code) => {
          socket.emit("join-classroom", code);
        });
        break;

      case "leave-classroom":
        appData.classroom = false;
        window.history.pushState("", "", "/");
        setAppData({ ...appData });
        socket.emit("leave-classroom");
        break;

      case "create-classroom":
        socket.emit("create-classroom");
        break;

      case "english":
        strings.setLanguage("en");
        setAppData({ ...appData });
        break;

      case "french":
        strings.setLanguage("fr");
        setAppData({ ...appData });
        break;
    }
  };

  const onChange = (inputs) => {
    setReclassify(false);
    setRecipe(inputs);
    setUpdated(true);

    // Show reclassify dialog after a delay
    if (reclassifyTimeout) {
      clearTimeout(reclassifyTimeout);
    }
    setReclassifyTimeout(setTimeout(() => setReclassify(true), 3000));
  };

  const onPrediction = (output) => {
    setClassification(output);
  };

  const onFindRecipe = (type, discuss = true) => {
    setReclassify(false);
    setUpdated(true);

    // Find first suitable recipe
    if (recipes.length > 0) {
      for (let index = 0; index < recipes.length; index++) {
        //here
        if (
          (!discuss || recipes[index].Discuss === 1) &&
          (type === "Random" || recipes[index][type] === 1)
        ) {
          // if ((!discuss || recipes[index].Discuss === 1) && (type === 'Random' || recipes[index][type] === 1) && (type === 'Random' || recipes[lastFoundRecipe][type] !== recipes[index][type])) {
          // //test
          // const item = type === 'Random' ? recipes[Math.floor(Math.random() * recipes.length)] : recipes[index];
          // setLastFoundRecipe(index);
          // // let tempRec = [...recipes];
          // // const item = tempRec.splice(index, 1)[0];

          // setRecipe(Object.values(item).slice(0, ingredients.length));
          // //test
          // if (!type === 'Random') {
          // 	console.log('last:');
          // 	console.log(recipes[lastFoundRecipe][type]);
          // 	console.log('this:');
          // 	console.log(recipes[index][type]);
          // }
          const item = recipes.splice(index, 1)[0];
          setRecipe(Object.values(item).slice(0, ingredients.length));

          // Show reclassify dialog after a delay
          if (reclassifyTimeout) {
            clearTimeout(reclassifyTimeout);
          }
          setReclassifyTimeout(setTimeout(() => setReclassify(true), 1000));
          return;
        }
      }
      if (discuss) {
        onFindRecipe(type, false);
      }
    }
  };

  // Send recipe to backend to save in DB
  const onSaveRecipe = () => {
    gtmTrack("sec_btn_click", "Pretrained", "Save Recipe", "");
    prompt(strings.nameRecipe).then((name) => {
      socket.emit("save-recipe", {
        name: name,
        ingredients: recipe,
        classification: classification,
      });
    });
  };

  const onReclassify = (recipe, reclassification) => {
    if (reclassification < 0) {
      reclassification = classification;
    }
    socket.emit("reclassify-recipe", {
      recipe: recipe,
      original_classification: classification,
      reclassification: reclassification,
    });
    setReclassify(false);
  };

  // Retrieve the NN from a link
  const retrieveNetwork = (hashID) => {
    checkEnv().then((res) => {
      if (res) {
        socket.emit("retrieve-network", hashID, (response) => {
          if (response) {
            let networkInfo = JSON.parse(response);
            const nn = JSON.parse(networkInfo.data);
            const nnName = nn.network[nn.network.length - 1].name;
            nn.network.pop();
            setRetrievedNetwork({
              network: nn.network,
              connections: nn.connections,
              name: nnName,
            });
          } else {
            setRetrievedNetwork(response);
          }
        });
      }
    });
  };

  // Share the network and recieve the URL
  const shareNetwork = (
    sharing,
    network = buildNetwork.network,
    connections = buildNetwork.connections,
    networkName
  ) => {
    if (sharing && envVariables) {
      setLoading(true);
      let d = new Date();
      let newNN = [...network];
      newNN.push({ sharing: -1, name: buildNetwork.name });
      const jsonObj = nnToJSON(newNN, connections);

      socket.emit(
        "save-network",
        {
          data: jsonObj,
          dateTime: `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`,
        },
        (response) => {
          if (response.status === 1) {
            let urlId = response.id.split(".")[1];
            let url = window.location.origin + "/build/" + urlId;
            setBuildNetwork({
              name: buildNetwork.name,
              network: network,
              connections: connections,
              id: response.id,
              urlId: urlId,
              url: url,
              visible: true,
            });
          } else {
            setLoading(false);
            alert(response.message, "rateLimit");
          }
        }
      );
    } else {
      setBuildNetwork({
        name: networkName,
        network: network,
        connections: connections,
        visible: false,
      });
    }
  };

  // Check if Environment Variables Exist
  const checkEnv = () => {
    let resPromise;

    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "staging"
    ) {
      resPromise = true;
      setEnvVariables(resPromise);
    } else if (process.env.NODE_ENV === "production") {
      resPromise = new Promise((resolve, reject) => {
        socket.emit("check-env", (response) => {
          setEnvVariables(response);
          resolve(response);
        });
      });
    }

    return resPromise;
  };

  // Show and hide instruction boxes
  const clickInstructionButton = (e) => {
    if (instructionId !== "4-1" && instructionId !== "4-2") {
      const id = e.target.id;
      setInstructionId(id);

      if (id === "4-1" || id === "4-2") {
        setDisableFindRecipe(false);
        document.querySelector(".Popup").style.display = "none";
        document
          .querySelectorAll(".Neuron-input")
          .forEach((elem) => elem.classList.remove("zIndex"));
        document
          .querySelectorAll(".Neuron-output")
          .forEach((elem) => elem.classList.remove("zIndex"));
      } else {
        id !== "2" ? setDisableFindRecipe(true) : setDisableFindRecipe(false);
        document.querySelector(`.Popup-${id}`).style.display = "none";
        document.querySelector(`.Popup-${parseInt(id) + 1}`).style.display =
          "block";
      }
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="*/build" exact>
            <NavBar
              title={strings.buildNetwork}
              appData={appData}
              route="build"
              onCommand={onCommand}
              checkEnv={checkEnv}
              envVariables={envVariables}
              content={
                <>
                  <button
                    onClick={() => {
                      shareNetwork(true);
                      gtmTrack("sec_btn_click", "Build", "Share Recipe", "");
                    }}
                  >
                    {strings.shareNetwork}
                  </button>
                </>
              }
            />
            <Network shareNetwork={shareNetwork} buildNetwork={buildNetwork} />
          </Route>
          <Route path="*/build/:id">
            <NavBar
              title={strings.buildNetwork}
              appData={appData}
              route="build"
              onCommand={onCommand}
              checkEnv={checkEnv}
              envVariables={envVariables}
              content={
                <>
                  <button
                    onClick={() => {
                      shareNetwork(true);
                      gtmTrack("sec_btn_click", "Build", "Share Recipe", "");
                    }}
                  >
                    {strings.shareNetwork}
                  </button>
                </>
              }
            />
            <Network
              shareNetwork={shareNetwork}
              buildNetwork={buildNetwork}
              shared={true}
              retrieveNetwork={retrieveNetwork}
              retrievedNetwork={retrievedNetwork}
              setRetrievedNetwork={setRetrievedNetwork}
              envVariables={envVariables}
            />
          </Route>
          <Route path="*/trained" exact>
            <TrainedNetworkInstructionPopup
              clickButton={clickInstructionButton}
            />
            <NavBar
              title={strings.pretrainedModel}
              appData={appData}
              route="trained"
              onCommand={onCommand}
              checkEnv={checkEnv}
              envVariables={envVariables}
              content={
                <>
                  <SelectRecipe
                    classifications={classifications}
                    onSubmit={onFindRecipe}
                    clickInstructionButton={clickInstructionButton}
                    disableFindRecipe={disableFindRecipe}
                  />
                  <button
                    onClick={onSaveRecipe}
                    disabled={!appData.classroom || !updated}
                  >
                    {strings.saveRecipe}
                  </button>
                </>
              }
            />
            <TrainedNetwork
              onChange={onChange}
              onPrediction={onPrediction}
              inputs={recipe}
              ingredients={ingredients}
              classifications={classifications}
              getRecipe={getRecipe}
            />
            <Reclassify
              recipe={recipe}
              classifications={classifications}
              visible={reclassify}
              onReclassify={onReclassify}
              clickInstructionButton={clickInstructionButton}
            />
          </Route>
          <Route path="*/trained/:id">
            <NavBar
              title={"customPretrain"}
              appData={appData}
              route="trained"
              onCommand={onCommand}
              checkEnv={checkEnv}
              envVariables={envVariables}
              // content={
              // 	<>
              // 		<SelectRecipe classifications={false} onSubmit={onFindRecipe} />
              // 		<button onClick={onSaveRecipe} disabled={!appData.classroom || !updated}>
              // 			{strings.saveRecipe}
              // 		</button>
              // 	</>
              // }
            />
            <TrainedChefNetwork
              getCustomRecipe={getRecipe}
              onChange={onChange}
              onPrediction={onPrediction}
              inputs={recipe}
            />
          </Route>
          <Route path="*/stats">
            <NavBar
              title={strings.stats}
              appData={appData}
              route="stats"
              onCommand={onCommand}
              checkEnv={checkEnv}
              envVariables={envVariables}
            />
            <Stats
              appData={appData}
              ingredients={ingredients}
              classifications={classifications}
              recipes={recipes}
            />
          </Route>
          <Route path="*/article/intro-to-neural-networks">
            <NavBar
              title="Article - Intro to Neural Networks"
              appData={appData}
              route="intro-to-neural-networks"
              onCommand={onCommand}
              checkEnv={checkEnv}
              envVariables={envVariables}
            />
            <ArticleIntro />
          </Route>
          <Route path="/">
            <NavBar
              title="Intro to Neural Network"
              appData={appData}
              route="instructions"
              onCommand={onCommand}
              checkEnv={checkEnv}
              envVariables={envVariables}
            />
            <LandingPage onCommand={onCommand} appData={appData} />
          </Route>
        </Switch>
        <Alert />
        <Prompt />
        <SharePrompt
          loading={loading}
          setLoading={setLoading}
          buildNetwork={buildNetwork}
          onDismiss={() => setBuildNetwork({ ...buildNetwork, visible: false })}
        />
        <Backdrop loading={loading} />
        <ClassroomCode
          code={classroomCode}
          appData={appData}
          onDismiss={() => setClassroomCode(false)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
