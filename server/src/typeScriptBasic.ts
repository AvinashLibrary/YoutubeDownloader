import express, { Request, Response, Application, response } from 'express';
const app: Application = express();
import cors from 'cors';
import fs from 'fs';


/*  optional attributes */

interface user{
  name:string
  position:string
  address?:string
}

const data :user []= [{
  name:"rahul",
  position:'A'
},
{
  name:"rahul2",
  position:'AB'
}]

// here even though the address is not added no eeror as option is added in interface.

app.get('/checkInterface', (req: Request, res: Response) =>{

  response.send(data);

})


function pr(){

}


const PORT = 3000;


app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
  });