<h1 align="center">Expense-Visualize</h1>

> *« A demo of Multi Bar chart from D3.js »*

Features:

* **[Express](https://github.com/strongloop/express) server** with nested routing architecture.
* **[Nodemon](https://github.com/remy/nodemon)** with **[LiveReload](https://github.com/vohof/gulp-livereload)** for the development process.
* **Automatic bower dependencies injection** on package install.
* **MongoDB**, with [Mongoose ODM](https://github.com/learnboost/mongoose)

# Install

    Clone the repo
    npm install && bower install

# Manage project

    gulp

**Default task, run the server.** Build `sass` files, inject all scripts and styles to the project, watch them and open your default browser.


    npm run start:dev

**Run the server.** watch files, and restart the server.


    gulp build

Wipe old generated `dist` directory while keeping the `.git` to preserve your remotes configuration. Concat all the scripts and vendors in one minified `.js` file, same thing for your styles. Rev all resources for caching purposes; copy the server part.


    gulp preview

Run the `gulp build` process and serve the `dist` directory.


    npm start

**Run the server in production.** Runs the server from `dist` directory. 