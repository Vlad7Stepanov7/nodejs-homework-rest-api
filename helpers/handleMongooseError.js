const handleMongooseError = (error, data, next) => {
    const { name, code } = error;
    const status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    console.log(name);
    console.log(code);
    console.log(name === "MongoServerError" && code === 11000);
    error.status = status;
    next();
};

module.exports = handleMongooseError;