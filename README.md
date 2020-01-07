# Adam's Pivot Table

This project is a take-home coding challenge.

## Instructions

### `yarn start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test --watchAll=false --collectCoverage`

Runs all available tests once and collects a code coverage report

## Architectural Overview

This project is built on top of a base create-react-app. This allowed for quick development of a simple application for demonstrating the abilities of the pivot table. As such much of the boilerplate code comes directly from the create-react-app installation.

- `public` - This directory contains boilerplate public files for the web application. The only modifications made in this directory were to remove unnecessary files, change the application title, and to add a Google font
- `src` - This directory contains both boilerplate and the majority of the application code
  - `__snapshots__` - This directory contains Jest testing snapshots. They are generated automatically
  - `components` - The 'meat' of the project
    - `__snapshots__` - More Jest snapshot files
    - `body.js` - The main body of the table. A composition of everything except the column headers
    - `header.js` - The column headers of the table
    - `pivot.js` - The top-level pivot table component. Combines the column headers and the body
    - `pivot.test.js` - Unit tests for testing the pivot component directly
    - `row.js` - A single row of the body of the table. This does not include any column or row headers
    - `rowHeader.js` - A single row header component
  - `data` - This contains the embedded data files that are used for the project and testing.
  - `reducers` - This contains reducers that would be used to handle various dispatched actions for the application. In this simple case there is only one
    - `index.js` - The main file containing the reducer. This reducer responds to a dispatched action requesting data and responds with the embedded data. This could be modified to perform an async call to a real API quite easily
    - `reducers.test.js` - Unit tests for the reducers
  - `services` - Utility services for the application. In this simple case it contains the data parsing utility
    - `parser.js` - The data parsing utility. This transforms and aggregates the tabular data into a format that the pivot table can display
    - `parser.test.js` - Unit tests for the data parsing utility
  - `styles` - This contains the CSS Module files for the project. In a larger project it may make more sense to keep the styling closer to the components that are using the modules, however, in this simple case this seemed more appropriate
    - `app.module.css` - The global and top-level styling for the application
    - `grid.module.css` - The grid specific styling
    - `pivot.module.css` - Styling specific to the top-level pivot component and table
  - `App.js` - This is the root component of the application. It is what renders the pivot table on the screen and configures it
  - `App.test.js` - Unit tests for the application as a whole. Utilizing the react-testing-library this provides a wholistic view of the application as the user would consume it
  - `constants.js` - Constant values that are factored out of the main code to make them easier to modify in the future. In this simple implementation this only contains internal data structure field names
  - `index.js` - The root of the application. This is what connects HTML and React together
  - `serviceWorker.js` - create-react-app boilerplate. Not modified or used
  - `setupTests.js` - create-react-app boilerplate. Setup file for Jest. Not modified

## Assumptions and Simplifications

- Development tools and dependencies are allowed (i.e. Prettier, TravisCI)
- Multiple dimensions were only supported for rows
- "Dimensions should be configurable in code" - I assumed this to mean that being able to modify the `column`, `rows`, and `metric` options in the `App.js` file
- Bells and whistles were not included
  - Dark mode
  - UI configuration
  - Frozen columns/rows
  - Collapsing rows
  - Real API feeding the data

## Next steps

- Supporting the bells and whistles that were not included in this implementation
- Support for multiple dimensions on columns
- Hooking the table up to a real data API
