import express, { Request, Response, Application } from 'express';
const app: Application = express();
import cors from 'cors';
import fs from 'fs';


const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(express.json());
app.use(cors(options))


const PORT = 3000;


app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node tester!")
});

app.get("/getListOfStoredItems", (req: Request, res: Response): void => {
  res.json([{ name: "project", type: "zip" }, { name: "photos", type: "jpeg" }])
});


app.get('/getVideo', (req: Request, res: Response): void => {
  const range = req.headers.range;
  const video_path = './videocontent/Design.mp4'
  const videoSize = fs.statSync(video_path).size;
  const Chunk_Size = 10 ** 6;
  const start = Number(range?.replace(/\D/g, ""));
  const end = Math.min(start + Chunk_Size, videoSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);

  var videoStream = fs.createReadStream(video_path, { start, end });
  videoStream.pipe(res)
});


app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
