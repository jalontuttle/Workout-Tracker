const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const apiRoutes = require('./routes/apiroutes')

const PORT = process.env.PORT || 3000;

function connect() {
const connection = mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    connection.catch(err => {
      console.log('err ' + err);
    })
};

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(apiRoutes);



app.listen(PORT, ()=> {
    console.log(`App running on port ${PORT} `);
});

module.exports= {connect}