# React Interview Scheduler

A modern single page application (SPA) called Interview Scheduler, built using React.

# Setup
1. Fork this repository, then clone your fork of this repository.
2. Install dependencies with `npm install`.
3. Start the web server using the `npm start`. The app will be served at *http://localhost:8080/*
4. Go to *http://localhost:8080/* in your browser.

## Screenshots
!["Home Page with Appointments for that Day"](https://github.com/c1ar3nc3/scheduler/blob/master/docs/HomePage.png?raw=true)
!["Booking a new Interview"](https://github.com/c1ar3nc3/scheduler/blob/master/docs/CreatingAppt.png?raw=true)
!["Hovering over an Appointment"](https://github.com/c1ar3nc3/scheduler/blob/master/docs/HoverAppt.png?raw=true)
!["Deleting an Appointment"](https://github.com/c1ar3nc3/scheduler/blob/master/docs/DeleteAppt.png?raw=true)

### Running Jest Test Framework

```sh
npm test
```

## Technical Specifications


* React
* Webpack, Babel
* Axios, WebSockets
* Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

