# Interview Scheduler 📅

Using the latest tools and techniques, I built and tested a React application that allows users to book and cancel interviews. I combined a concise API with a WebSocket server to build a realtime experience.

## Final Product

![Show Active Interview](public/docs/Show.png?raw=true "Show")
![Active Interview Actions](public/docs/Hover.png?raw=true "Hover")
![Create Interview](public/docs/Create.png?raw=true "Edit")
![Edit Exisiting Interview](public/docs/Edit.png?raw=true "Edit")
![Delete Interview Confirmation](public/docs/Confirm.png?raw=true "Confirm")

## Setup

- Install dependencies with `npm install`.
- Fork and git clone [scheduler-api repro](https://github.com/lighthouse-labs/scheduler-api)
  - Follow README instructions to setup
- Visit `http://localhost:8080/` to view application
- Reset the database: `http://localhost:8081/api/debug/reset`

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- axios
- react-test-renderer
- testing-library/react-hooks

## Roadmap

- Stretch activities
