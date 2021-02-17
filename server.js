const express = require('express');
const cors = require('cors');



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 8000;
//authentiication route
app.use('/authentication', require('./routes/authentication'));

app.use('/dashboard', require('./routes/dashboard'));


app.listen(port, () => {
    console.log(`listening to port ${port}`);
});