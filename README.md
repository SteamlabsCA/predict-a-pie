# Predict-a-Pie

Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas faucibus mollis interdum. Maecenas faucibus mollis interdum.

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
````

Runs the app in the development mode. Changes to the code are automatically compiled, speeding development. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

```console
node src/server.js
```

Will start the server side component allowing the client side to create and join classrooms. You will however need to temporarily change the websocket address used by the client side app, as the app and development server must listen on different ports. This is achieved by editing line 25 of `App.js`.

```javascript
const socket = socketClient('http://127.0.0.1:8080');
```
