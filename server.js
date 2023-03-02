const app = require('./app');
const mongoose = require('mongoose');
const { dbHost } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(dbHost)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch(error => {
    console.log(error);
    process.emit(1);
  })


