# Use Your Stash Full Stack App

This is an app designed to display yarn and patterns. When a yarn is clicked on, patterns will be matched based on yarn weight and yardage, and will populate to the right. When a pattern is clicked on, matching yarn will display to the right. Yarn and patterns can be added by clicking a link at the top left of each respective page, which will take the user to a form page.

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p` or by searching for the MySQL Command Line Client on your Windows searchbar.
- Create a new database called use_your_stash: `create database use_your_stash;`
- Edit the `.env` file in the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=use_your_stash
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create three tables in your database called 'yarn', 'patterns', and 'yarn_patterns'.

The init_db.sql file contains MySQL code to insert three yarns, three patterns, and associated matching data for the yarn_patterns table to start off.

### Running the App

- Run `npm start` in project directory to start the Express server on port 4000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.
