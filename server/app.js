const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express();
dotenv.config();
app.use(cors());

//connection to db
mongoose.connect("mongodb://" + process.env.MONGOUSERNAME + ":" + process.env.MONGOPASSWORD +"@ds149706.mlab.com:49706/weenit", {useUnifiedTopology: true,useNewUrlParser: true});
mongoose.connection.once('open',()=>{
    console.log('connected to db')
})

app.use('/api',graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(process.env.NODEPORT,()=>{
console.log(' server listening on port',process.env.NODEPORT, ',your mongo username is', process.env.MONGOUSERNAME)
})