const express = require('express');
const app = express();
require('dotenv').config();
const {dbConnect} = require('./config/database');
const roleRouter = require('./routes/roleRouter');
const authRouter = require('./routes/authRouter');
const communityRouter = require('./routes/communityRouter');
const memberRouter = require('./routes/memberRouter');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
dbConnect();

app.use('/v1/auth', authRouter);
app.use('/v1/role', roleRouter);
app.use('/v1/community', communityRouter);
app.use('/v1/member', memberRouter);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000');
});

