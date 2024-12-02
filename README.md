# Use Your Stash
Use Your Stash is a cosy full stack app that lets users keep track of crafting materials and patterns, and allows matching between the two to make the most of what users already have.

## See Use Your Stash in Action
[Watch the video on Loom](https://www.loom.com/share/f48a0b873e7d4fcfb3a1836bdeb5e0ad?sid=7ff35c4a-65b3-4e82-8aaa-c7d1afb1a228)

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Techologies Used](#technologies-used)
4. [Installation](#installation)
5. [My Contributions](#my-contributions)
6. [Screenshots](#screenshots)
7. [Future Features](#future-features)
8. [License](#license)

## Overview
Use Your Stash lets users keep track of their yarn stash and fiber arts patterns. They can match yarns in their collection to patterns, and vice versa. Using yarn and patterns they already have can reduce crafting waste, and also save users money on yarn purchases. I built Use Your Stash to help keep track of my own yarn stash. It's a full stack app that is particularly interesting on the back end, where a many-to-many relationship between yarn and patterns in the database made for some more complex endpoints as I was learning back end programming.

## Features
- Store and access yarn information
- Store and access pattern information
- Match yarn by weight and yardage to patterns
- Match a pattern by weight and yardage to yarn

## Technologies Used
- Front end: React, CSS, Bootstrap
- Back end: Node.js, Express
- Database: MySQL
- Other tools: Git, GitHub, Postman, Vite

## Installation
1. Clone the repository:  
  `git clone https://github.com/your-username/use-your-stash`

2. Navigate to the project directory:  
  `cd use-your-stash`

3. Install server-related dependences, such as Express:  
  `npm install`

4. Install front end dependencies, such as React, on the client side:  
  `cd client`  
  `npm install`

5. Set up the database
    - Access the MySQL interface:  
    **Mac users:** In your terminal, enter `mysql -u root -p`  
    **PC users:** Search MySQL Command Line Client

    - Create a new database:  
    `create database use_your_stash`
  
    - Add a `.env` file to the project folder of this repository containing your MySQL authentication information. For example:  
      ```bash
      DB_HOST=localhost
      DB_USER=root
      DB_NAME=use_your_stash
      DB_PASS=YOURPASSWORDHERE
      ```
    - Migrate the database and create the tables in the main folder of the repository. This will create three tables in your database called 'yarn', 'patterns', and 'yarn_patterns'. The init_db.sql file contains MySQL code to insert three yarns, three patterns, and associated matching data for the yarn_patterns table to start off.     
    `cd ..` (if still in the client folder)  
    `npm run migrate`

6. Start the Express servier on port 4000:  
`npm start`

7. Express needs that terminal to run. Open a new terminal to start the client in port 5173:  
  `cd client`  
  `npm run dev`  
  Click on the link or copy and paste it into your browser, and you can use the app!

## Screenshots
### Home Page
![Home Page view](/readmeassets/Home-Page.png "Home Page")
### Yarn with Matching Patterns
![Yarn view](/readmeassets/Yarn-With-Match.png "Yarn with pattern match")
### Add Yarn
![Add Yarn view](/readmeassets/Add-Yarn.png "Add Yarn")
### Patterns with No Match Message
![Pattern view](/readmeassets/Patterns-No-Match.png "Patterns with no match message")
### Add a Pattern
![Add a Pattern view](/readmeassets/Add-Pattern.png "Add a pattern")

## Future Features
- Store patterns as PDFs for easy access
- Edit yarn details
- Edit pattern details
- Add user login
- Connect to Ravelry API to suggest patterns for users if they do not have a matching pattern for a yarn

## License
This project is licensed under the MIT License. See the [License](./License) file for details.