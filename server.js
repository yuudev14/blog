const express = require('express');
const cors = require('cors');



const app = express();

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 8000;
//authentiication route
app.use('/authentication', require('./routes/authentication'));

app.use('/dashboard', require('./routes/dashboard'));

app.use('/blogs', require('./routes/blogs'));


app.listen(port, () => {
    console.log(`listening to port ${port}`);
});