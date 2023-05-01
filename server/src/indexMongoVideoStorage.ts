import express, { Request, Response, Application } from 'express';
const app: Application = express();
import cors from 'cors';
import fs from 'fs';
import mongoose from 'mongoose';
import { MongoClient, GridFSBucket, FindOptions } from 'mongodb';

import multer from 'multer';

const upload = multer({ dest: 'uploads' })


const allowedOrigins = ['http://localhost:4200'];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins,
//   allowedHeaders: 'Access-Control-Allow-Origin,ETag'
// };

var options: cors.CorsOptions = { origin: 'http://localhost:4200', credentials: true }
const url = 'mongodb://localhost:27017';


app.use(express.json());
app.use(cors(options));


const PORT = 3000;


app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node tester!")
});

app.post("/upload", async (req: Request, res: Response) => {
  var client = await MongoClient.connect(url);
  var db = client.db('video')
  const bucket = new GridFSBucket(db);
  const video_path = './videocontent/Design.mp4'
  const videoUploadStream = bucket.openUploadStream('design');
  var videoreadStream = fs.createReadStream(video_path);
  videoreadStream.pipe(videoUploadStream);
  res.send('upload completed')

});

app.get('/download', async (req: Request, res: Response) => {

  var client = await MongoClient.connect(url);
  var db = client.db('video');
  const range = req.headers.range;
  var video = await db.collection('fs.files').findOne({});
  var videoSize = video?.length;
  const Chunk_Size = 10 ** 6;
  const start = Number(range?.replace(/\D/g, ""));
  const end = videoSize - 1;

  const contentLength = end - start + 1;
  console.log(videoSize)
  console.log(Chunk_Size)
  console.log(start)
  console.log(end)
  console.log(contentLength)
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);

  var bucket = new GridFSBucket(db);
  const videodownloadStream = bucket.openDownloadStreamByName('design', { start });
  videodownloadStream.pipe(res);

});

app.post('/uploadVideoBigImageFromUI', async (req: Request, res: Response) => {


});

app.post('/uploadfileToNode', upload.single('avatar'), async (req: Request, res: Response) => {

  console.log(req.file)


})

app.get("/getListOfStoredItems", (req: Request, res: Response): void => {
  res.cookie('cookieName', 'cookieValue', { httpOnly: true, sameSite: 'none', secure: true })
  // res.set('Access-Control-Allow-Credentials',"true");
  res.set('Access-Control-Expose-Headers', 'ETag,X-Powered-By,Set-Cookie')
  res.json([{ name: "project", type: "zip" }, { name: "photos", type: "jpeg" }]);
});

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
