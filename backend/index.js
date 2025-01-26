const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const admin_route = require('./Routes/Adminroute');
const user_route = require('./Routes/User');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"))
app.use('/auth', AuthRouter);
app.use('/admin', admin_route);
app.use(user_route)
app.get("/",(req,res)=>{
    res.send("hello oracle-soft backend part!")
})
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})