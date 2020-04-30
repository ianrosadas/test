const mongoose = require("mongoose");

const mongodbUrl =
  // "mongodb+srv://SuperTestUser:123@cluster0-otwmi.mongodb.net/test?retryWrites=true&w=majority";
"mongodb://SuperTestUser:SuperTestUser1@ds211648.mlab.com:11648/todo-tdd";
// "mongodb+srv://SuperTestUser:123@cluster0-otwmi.mongodb.net/test"
// mongodb+srv://SuperTestUser:<password>@cluster0-otwmi.mongodb.net/test?retryWrites=true&w=majority
// mongo "mongodb+srv://cluster0-otwmi.mongodb.net/test"  --username todo-tdd

async function connect() {
  try {
    await mongoose.connect(
      mongodbUrl,
      { useNewUrlParser: true, useUnifiedTopology: true }
      // (err)=>{
      //     console.log("mongo db")
      //     console.log(null)
      //     console.log(err)
      // }
    );
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

module.exports = { connect };
