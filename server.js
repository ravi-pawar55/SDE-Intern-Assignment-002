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

app.get('/v1/', (req, res) => {
    res.status(200).json({
        status:true,
        message:'Welcome to the API'
    })
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server started on port 3001');
});

