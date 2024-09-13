# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Dog Breeds Data Table and Carousel Application

This application demonstrates Front-End development expertise by presenting data in two distinct formats: a **Data Table** and an **Interactive Carousel**. The application fetches data from The Dog API to display a list of dog breeds in both a table and a carousel view. Users can toggle between these views using buttons in the navigation bar. The table view supports pagination, while the carousel offers image sliding and additional data loading functionality.

## Technologies Used

1. React: For building the user interface.
2. Vite: As the development tool for faster builds.
3. Context API and useReducer: For state management across components.
4. CSS: For styling the components.
5. Fetch API: For fetching data from the external Dog API.

## API Integration

The application fetches data from The Dog API to populate both the data table and carousel components. It uses the following endpoints:

1. Data Table: Fetches 10 dog breed records for each page.
2. Carousel: Fetches 10 random dog breed images to display in the slider.
   The API calls are secured using an API key stored in the .env file.

## State Management

This project utilizes React's useReducer for managing state in both the Pagination and Carousel components. State is managed independently for each component:

1. PaginationContext: Manages the state of the data table, including the current page, loading state, and cached data.
2. CarousalContext: Handles the state for the carousel, including the list of images, current slide index, and loading state.

## Optimizations

1. Implemented Loader until data is fetched:
   A loading indicator is displayed while data is being fetched from the API, ensuring a smooth user experience.
2. Efficient Data Fetching:
   Caching is implemented to store fetched data, preventing unnecessary API calls when switching between pages and ensuring quick access to previously loaded content.
3. Carousel optimized by including a Load More button that generates more data:
   The Load More button fetches additional data when required, allowing users to dynamically load content as they explore.
4. Responsive Layout:
   The UI is designed to adapt to different screen sizes and resolutions, offering an optimal user experience across devices.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Components](#components)
  - [App](#app)
  - [DataTable](#datatable)
  - [Pagination](#pagination)
  - [Carousel](#carousel)
  - [State Management](#state-management)
- [API Details](#api-details)

## Installation

To get started with this project, follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/ashwek-padolkar/DogsAPI2.git

   ```

2. To navigate to the project folder:

```bash
cd DogsAPI2
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

## Available Scripts

1. npm run dev: Starts the development server.
2. npm run build: Builds the project for production.
3. npm run preview: Preview the production build locally.
