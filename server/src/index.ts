import express from "express"
import cors from "cors"

const app = express();


//middleware -> it is used to parse incoming json request 
app.use(express.json())

//CORS - cross origin resource sharing , it allow your express server to accept request from different origins
app.use(cors())

const PORT = process.env.PORT || 8000;




//server is listening on port 8000
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    
})