import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { StreamChat } from "stream-chat";
import {v4 as uidV4} from "uuid";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname } from "path";



const app = express();

app.use(cors());
app.use(express.json());

// Setting the api key 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env`});


const apiKey = process.env.API_KEY;
const apiSecretKey = process.env.API_SECRET;

const serverClient = StreamChat.getInstance(apiKey,apiSecretKey);



app.post("/signup",async (req,res,next)=>{

  try{
    const { firstName, lastName, userName, password } = req.body;
    const userId = uidV4();
    const hashedPassword = await bcrypt.hash(password,10);
    
    const token = serverClient.createToken(userId);
    
    res.json({token,userId,firstName,lastName,userName,hashedPassword});

  } catch (err){
    res.json({err});
  }
});

app.post("/login",async (req,res,next)=>{

  try{
    const {userName, password} = req.body;
    const {users} = await serverClient.queryUsers({name:userName});
    if(users.length === 0) return res.json({message:"User not found"});
    
    // creating token based on username.
    const token = serverClient.createToken(users[0].id);
    const passwordMatch =await bcrypt.compare(password, users[0].hashedPassword);
    
    if(passwordMatch){
      // res.json({vhdc:"patel"})
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        userName,
        userId: users[0].id,
        hashedPassword: users[0].hashedPassword,
      });
    }
  } catch(e){
    res.json(e);
  }
    
})

app.listen(3030,()=>{
  console.log("Server is running on port 3030");
})