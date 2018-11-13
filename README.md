# London's museums

## Description:
This single page app uses Google maps and Foursquare's API to list all the available museums near by in London, England. This project was made for Udacity's front-end web developer Nanodegree Program.

## Specification
The goal of this project was to build a single page map application using React & Google Maps API, plus to integrate a third-party data API and make the app accessible and usable offline.

## How to run this project:
Make sure that you have Node.js installed on your device and then clone the repository. Navigate to the directory that contains the project and write:

Download or clone the repository in your computer:
```sh
$ git clone https://github.com/Rajeshvirola/neighbourhood-map.git
```
- install project dependencies with

```sh
npm install react react-dom
npm install --save react-async-script-loader
npm install react-search-input
npm install sort-by
```
- start the development server with

```sh
npm start
```

The browser should automatically open the app. If it doesn't, navigate to [http://localhost:3000](http://localhost:3000/)

## Important
Service Worker providing offline capabilities works only in the production mode.

## APIs Used
- Google Maps API for the map.
- Places API by FourSquare


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
