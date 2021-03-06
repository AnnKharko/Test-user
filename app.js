const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const swaggerUI = require('swagger-ui-express');

const { apiRouter } = require('./router');
const {
    MONGO_URL, PORT, ALLOWED_ORIGIN, serverRateLimits
} = require('./config/config');
const Sentry = require('./logger/sentry');
const swaggerDoc = require('./docs/swagger.json');

const app = express();

// eslint-disable-next-line no-use-before-define
_connectDB();

app.use(Sentry.Handlers.requestHandler());

const cronRun = require('./cron-job');

const serverRequestRateLimit = rateLimit({
    windowMs: serverRateLimits.period,
    max: serverRateLimits.maxRequests
});

// eslint-disable-next-line no-use-before-define
app.use(cors({ origin: configureCors }));
app.use(serverRequestRateLimit);
app.use(helmet());
app.use(morgan('dev'));
app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/', apiRouter);
app.use(Sentry.Handlers.errorHandler());

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    Sentry.captureException(err);

    res
        .status(err.status || 500)
        .json({
            code: err.customCode || 0,
            message: err.message || ''
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    cronRun();
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;
    connection.on('error', (error) => {
        console.log(error);
    });
}

function configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!origin) { // FOR postman
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
}
