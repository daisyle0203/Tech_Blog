const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');

// Require helper functions
const helpers = require('./utils/helpers'); 

// Set up Handlebars.js engine with custom helpers
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers }); 

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Call express and set up the port
const app = express();
const PORT = process.env.PORT || 3001;

// Create session and connect session to sequelize database
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// use the middleware session so we have access to session the req body
app.use(session(sess));

// set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
