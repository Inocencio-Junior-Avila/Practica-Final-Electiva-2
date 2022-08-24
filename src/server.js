const express = require('express');
const app = express();


// * MiddleWares
const cors = require('cors');
app.use( express.static('public') );
app.use( cors() );
app.use( express.urlencoded({ extended: true }));

// * Port
app.set( 'port', process.env.PORT || 3000 );


module.exports = app;

