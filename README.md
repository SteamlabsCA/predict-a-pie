# Predict-a-Pie

What makes a pie taste the best? What if you had all the ingredients in the world to come up with the perfect pie? In this workshop, you will wire up a neural network to do just that! You will then use your new knowledge to test a larger neural network that has used “machine learning” to analyse thousands of recipes to come up with new, creative combinations.

## Getting Started

Predict-a-pie is written in JavaScript and requires Node.js. If you do not already have Node.js installed in your environment, you may download it from [https://nodejs.org/](https://nodejs.org/).

```console
npm install
```

Will install the required dependencies.

```console
npm run build
```

Builds the app for production to the `build` folder.

```console
npm start
```

Starts the app! Open [http://localhost:8080](http://localhost:8080) to view the app in the browser.

## Development

```console
npm run dev
```

Runs the app in the development mode. Changes to the code are automatically compiled, speeding development. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

```console
node src/server.js
```

Will start the server side component allowing the client side to create and join classrooms. You will however need to temporarily change the websocket address used by the client side app, as the app and development server must listen on different ports. This is achieved by editing line 25 of `App.js`.

```javascript
const socket = socketClient("http://127.0.0.1:8080");
```

## AWS accounts

There is only one AWS account for both staging and production, and there is only one EC2 instance and Elastic Beanstalk environment which are for the production site.

The auto deployment for the production site works by pushing changes on main branch.
However, the auto deployment for the staging site doesn't work.
