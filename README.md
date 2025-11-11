# LIT Full-Stack Test

This project was bootstrapped with [Create Vite Project](https://vite.dev/guide/).

## Table of Contents

1. [Installation](#installation)
2. [Backend informations](#backend)
3. [Exercise](#exercise)

## Installation

- Go the project folder
- Make sure you running Node v22.14, you can use [nvm](https://www.nvmnode.com/) if needed
- Run `npm install`
- Start the dev environment with `npm run start`
- This will start both the GraphQL server and the frontend app
- Project should be available at http://localhost:3000

## Backend

Files are found under `packages/server`.

This is a simple Apollo server with mocked data.

The GraphQL server should be reachable at this url: http://localhost:4000/graphql after running the `npm run start` command.

## Exercise

Based on the data available from the GraphQL endpoint, the application should list, in the Home page, all the posts available with a load more feature.  

A Category page should list all the categories available in a sidebar.  

**Optionally**, when the user drags a category from the sidebar to the main area of the page, all posts of this category should be loaded (no need to add a fetch more feature this time).

The application uses Vite for building, Material UI for styling, React-DND for drag and drop support and React Router for routing, feel free to use it or not, it's up to you.

**In order for the client side to work properly, you will need to complete the missing parts in `packages/server` folder indicated by `TODO`.**

The only technical choice that you can't change is the use of Typescript :)

When finished, simply create a zipped file (without the `nodes_modules`, `build` and `dist` directories) of the project.

### Features

#### As a user i want to see all available posts in the Homepage of the app

- Post should display:
  - A title
  - A summary of the content which should not exceed 120 characters
  - A cover image
  - A "Read more" link to access the detail view of the Post
- When user click on the "Read more" link it should redirect him to the detail view of the post

#### As a user i want to load more available posts in the Homepage of the app

- At the bottom of the page a "load more" button should be visible
- When user click on this button, a new set of posts should be loaded
- When there is no more posts to load, button shouldn't be visible

#### As a user i want to see the details view of a Post

- When user click on the "Read more" link from a Post List it should redirect him to a detail view of the post
- When user access to this details view he should see:
  - The title of the post
  - The content of the post
  - The cover image of the post
  - The associated category title

#### As a user i want to see a list of available categories in the Category page

- When user reach the Category page, a sidebar listing all the available categories should be visible
- The sidebar should show:
  - The title of the category
  - A summary of the category description which should not exceed 30 characters
  - The number of posts associated to this category

### Features (Optional)

**The following features are optional, you can implement them if you have time, but they are not mandatory.**

#### As a user i want to drag a category inside the main area of category page to display all posts associated to this category

- When user select a Category in the Category sidebar he should be able to drag it to the main area of the Category page
- A visual state should be added to the dragged category in order to indicate user that it's a dragging state

#### As a user i want to load all the related post of a category when user drop a category inside drop area of the Category

- When user drop a category from the sidebar to the drop area of the Category page we should load and display all the associated post
