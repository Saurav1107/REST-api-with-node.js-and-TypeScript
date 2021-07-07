import mongoose from 'mongoose';


function connect() {
  const dbURI = "mongodb://localhost/Grocery"

  return mongoose.connect(dbURI,{useNewUrlParser : true ,useUnifiedTopology : true}).then(() => {
    console.log("Connected to DB...!!!!");
  }).catch((error) => {
    console.log("DB error" , error);
  });
}

export default connect;