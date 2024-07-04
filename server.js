import {connectDB} from './DB/index.js'
import { app } from './app.js';



connectDB();


app.listen(process.env.PORT,()=>{
    console.log(`Server is working on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
})