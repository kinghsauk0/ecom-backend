import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MON0DB_URL}/${process.env.DB_NAME}`
    );
    console.log(` Mongodb connected ! host : ${connection.connection.host}`)
  } catch (error) {
    console.log("Mongodb connection error",error)
    process.exit(1)
  }
};


export default ConnectDB