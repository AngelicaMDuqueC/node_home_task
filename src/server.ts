import * as fs from "fs";
import express, {Request, Response } from "express";
import {checkSchema, validationResult} from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import {env} from 'process';
import dotenv from 'dotenv';
import {User, changePassword, getUser, getAutoSuggestUsers, validations} from './utils';
import morgan from "morgan";

dotenv.config()

const users: Array<User> = []

const app = express();
const {PORT = 3000} =  env; 

app.use(express.json({limit:'50mb'}))

app.get('/', (req:Request,res:Response) => {
  res.send('Hello World!');
});

app.get('/users/', (req: Request, res: Response)=> {
  const loginSubstring = req.query.loginSubstring as string;
  const limit = parseInt(req?.query?.limit as string );

  if (!loginSubstring && !limit) {
    res.send(users);
  } else {
    const suggestedUsers = getAutoSuggestUsers(loginSubstring, limit, users);
    res.send(suggestedUsers);
  }


})

app.get('/users',(req:Request,res:Response)=> {
  res.send(users);
})


app.get('/users/:id',(req:Request,res:Response)=> {
  const user = getUser(users,req.params.id);
  if(!user || user.isDeleted) return res.status(404).send('user not found')
  res.send(user);
})

app.use( (req: Request, res: Response, next) => {
  const {login, password, age} = req?.body;
  if(!login || !password || !age) {
    res.status(411).send('all fields are required')
  } else {
    next()
  }
})



// create a user
app.post('/users',checkSchema(validations),(req: Request, res: Response) => {
  const user = {
    id: uuidv4().toString().substring(0,5),
    login: req?.body?.login,
    password: req?.body?.password ,
    age: req?.body?.age,
    isDeleted: false,
  } as unknown as User;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const copyUser = {...user, password:changePassword(user.password)}
  users.push(user);
  res.status(201).send(copyUser);
});


// Update a user by id
app.put('/users/:id', (req: Request, res: Response) => {
  const user:User|undefined = getUser(users,req.params.id);
  if (!user || user.isDeleted) {
    return res.status(404).send('User not found');
  }
  user.login = req?.body?.login;
  user.password = req?.body?.password ;
  user.age = req?.body?.age;
  const copyUser = {...user, password:changePassword(user.password)}
  res.send(copyUser);
});

// Delete a user by id
app.delete('/users/:id', (req: Request, res: Response) => {
  const user = getUser(users,req.params.id);
  if (!user || user.isDeleted) {
    return res.status(404).send('User not found');
  }
  user.isDeleted = false;
  res.send(user);
});


app.listen(PORT, () => {
  morgan(`Listening on port  ${PORT}`)
});

