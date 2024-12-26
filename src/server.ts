
import mongoose from "mongoose";
import app from "./app"

const port = 5000;

async function main() {
    try{
      await mongoose.connect('mongodb+srv://mongoose:oRdevHrHQs7cLli7@cluster0.richl.mongodb.net/blogging-website?retryWrites=true&w=majority&appName=Cluster0');
      
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    }catch(error){
      console.log(error);
    }
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
  main();
  


// app.listen(port, ()=>{
//     console.log(`Example app listening on port ${port}`)
// })
