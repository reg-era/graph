# GraphQL

## Overview
This project is a web application that fetches talent data using GraphQL queries and displays it through graphs and statistics in SVG format. The data is fetched from a remote GraphQL endpoint and rendered interactively on the frontend.

- **Frontend URL**: [https://reg-era.github.io/graph/](https://reg-era.github.io/graph/)
- **Backend (JWT generator)**: [https://server-graph.onrender.com](https://server-graph.onrender.com)

This app was developed by **ilyass.med.fkh@gmail.com** (aka reg-era).

## Features
- Fetches data from the GraphQL endpoint: `https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql`.
- Displays the fetched data as graphs and statistics using SVG elements.
- A small backend that generates a JWT, deployed in a Docker container, to authenticate users.

## Technologies Used
- **GraphQL**: For querying and fetching the data.
- **SVG**: To create dynamic, interactive graphs and statistics.
- **JavaScript**: For the frontend logic.
- **Docker**: To containerize the backend service that generates JWT tokens.
- **Render**: For hosting the backend service that serves the JWT.

## Backend Information
The backend service is a small application deployed in a Docker container on [Render](https://server-graph.onrender.com), responsible for generating JSON Web Tokens (JWT) that are used for authenticating GraphQL requests.

## Frontend Information
The frontend application is hosted at [github-pages](https://reg-era.github.io/graph/) and allows users to interact with the data, viewing it in the form of graphs and statistics. It uses SVG elements for rendering the data visually.
