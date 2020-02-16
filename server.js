const express=require('express');
const mongoose=require('mongoose');
const config=require('config');
const path=require('path')
//const bodyParser=require('body-parser');
const app=express();
//const itemRouter=require('./routes/itemsRouter')
//bodyparser middleware


app.use(express.json());


//db config

const db=config.get('mongodbURI')

//connect to mongo

mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>{
    console.log("mongodb connceted")
}).catch((e)=>{
    console.log(e)
})

//app.use(itemRouter)
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
  const port = process.env.PORT || 5000;
  
  app.listen(port, () => console.log(`Server started on port ${port}`));