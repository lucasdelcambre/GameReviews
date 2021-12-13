require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }),
);
app.use(cookieParser());

require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/game.routes')(app);
require('./routes/review.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));