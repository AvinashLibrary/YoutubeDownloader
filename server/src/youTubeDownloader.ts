import express, { Request, Response, Application } from 'express';
const app: Application = express();
import cors from 'cors';
import fs from 'fs';
import mongoose from 'mongoose';
import { MongoClient, GridFSBucket, FindOptions } from 'mongodb';
import axios, { isCancel, AxiosError } from 'axios';

import multer from 'multer';

const upload = multer({ dest: 'uploads' })


var options: cors.CorsOptions = { origin: 'http://localhost:4200', credentials: true }
const url = 'mongodb://localhost:27017';


app.use(express.json());
app.use(cors(options));


const PORT = 3000;


app.get('/download', async (req: Request, res: Response) => {
  const downUri: any = req.query.downUri;

  if(downUri.includes('instagram')){

    axios({
      method: 'get',
      url: downUri,
      responseType: 'text',
  
    }).then(function (response) {
      debugger
      var exp = new RegExp('"articleBody":(.*)"keywords"','g')

      var string = response.data;
      var matchingString = string.match(exp);
      var finalString = '{' + matchingString[0] + ':[]}]}';
      var decode = decodeURIComponent(finalString);
      var yStreamData = JSON.parse(decode)
      res.json({ yStreamData });

      

    })
  }else{

  
  
  
  
  
    axios({
    method: 'get',
    url: downUri,
    responseType: 'text',

  })
    .then(function (response) {
      // console.log(response)
      var start = response.data.indexOf("streamingData");
      var end = response.data.indexOf("playerAds");
      if(end === -1 ){
        var end = response.data.indexOf("playbackTracking");
      }
      var numberrofitems = parseInt(end) - parseInt(start)
      var val = '{' + response.data.substring(parseInt(start) - 1, parseInt(end) - 2) + '}';
      var yStreamData = JSON.parse(decodeURIComponent(val))
      var { adaptiveFormats, formats } = yStreamData.streamingData;
      res.json({ adaptiveFormats, formats });

     
    });

  }
  debugger
 

  

});

app.get('/downloadVideoFile', async (req: Request, res: Response) => {
  const downUri: any = req.query.downUri;

  axios({
    method: 'get',
    url: downUri,
    responseType: 'stream',
    headers:{
      "Content-Type":'media',
      "Content-Transfer-Encoding": "base64"
    }

  })
    .then(function (response) {

      // res.download(downUri)

      res.set('Content-Disposition', 'attachment') 
      res.set('filename','ProposedFileName.mp4')
      res.set('Content-Type','video/mp4')
        

      response.data.pipe(res)

      // res.send(response.data)
 

      

});
    });

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});


