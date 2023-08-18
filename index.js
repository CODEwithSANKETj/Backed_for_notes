const express = require('express')
const { connection } = require('./db')
const { user_router } = require('./routes/user_routes')
const { noterouter } = require('./routes/notes_routes')
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())
app.use('/users',user_router)
app.use('/notes',noterouter)
app.get('/',(req,res)=>{
    res.send('<h1>Welcome to home page</h1>')
})


app.listen(8999,async()=>{
    try{
        await connection
        console.log('Connected to db');
        console.log('Server is running at 8999');
    }
    catch(err){
        console.log(err);
    }
    
})