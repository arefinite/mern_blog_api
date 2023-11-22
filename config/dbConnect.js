import { connect } from "mongoose";


export const dbConnect = async () => {
  try {
    await connect(process.env.DB__URI)
    console.log('Database connection established');
      
    
  } catch (error) {
    console.log('Database connection error ' + error.message);
  }
}