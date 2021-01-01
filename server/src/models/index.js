const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PWD, MONGO_DBNAME } = process.env;
const MONGO_URI = `mongodb+srv://${MONGO_ID}:${MONGO_PWD}@nsddevil.lhsos.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`;
const connectDB = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => console.log('Mongodb connected.'))
    .catch((err) => console.error(err));

  mongoose.connection.on('disconnected', () => {
    console.log('mongodb disconnected! re connecting');
    connectDB();
  });
};

module.exports = connectDB;
