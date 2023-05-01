import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import mongoose, { Schema, model, connect, Types, Date , mongo, Connection} from 'mongoose';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import { isTemplateExpression } from 'typescript';
import { Int32, MongoClient , GridFSBucket} from 'mongodb';


const app: Application = express();
var options: cors.CorsOptions = { origin: 'http://localhost:4200', credentials: true }

app.use(express.json());
app.use(cors(options));
app.use(express.urlencoded({extended: true})); 


dotenv.config();



//declaration of the contants start here
const PORT = 3000;

var streamCounter = 0 ;



// code for routes start here.

app.get("/", (req: Request, res: Response): void => {
    res.send("Storing Images and Video and retriving all in the list one by one")
});



// 1. upload file to the files system .
// 2. after storing capture teh id and save that in the database
// 3. schema simply should have  fileId , date , standard Id of the line item 


interface fileInterface {
    user: string;
    fileName: string;
    fileType: string;
    size?: number;
    fileId: Types.ObjectId;
    
    
}

interface file {
    uploadDate : Date;
    length:number;
    filename:string;
    contentType:string;
    chunkSize:number;

}

const schema = new Schema<fileInterface>({
    user: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    size: { type: Number, required: true },
    fileId: { type: Schema.Types.ObjectId }

});

const schemaFile = new Schema<file>({
    uploadDate: { type: Date, required: true },
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    length: { type: Number, required: true },
    chunkSize: {  type: Number, required: true  }

});


interface fileChk {
    n : number;
    files_id :Types.ObjectId ;
    data: BinaryData;
} 


const fileChunk = new Schema<fileChk>({
    files_id: { type: Schema.Types.ObjectId },
    n: {  type: Number, required: true  },
    data:{ type: Schema.Types.Buffer  }

});



app.post('/uploadfileToNodeMutler', async (req: Request, res: Response) => {
   
    await mongoose.connect( 'mongodb://localhost:27017/UserUploadInfo');

    const UserModel = model<fileInterface>('fileInterface', schema);

    const storage = new GridFsStorage({ url: 'mongodb://localhost:27017/UserUploadInfo', options: { useUnifiedTopology: true }});

    const upload: multer.Multer = multer({
        storage
    });


    const test = upload.single('avatar');
    test(req, res, async function (err: any) {
        const userName  =  req.body.user;
        var itemDetail = new UserModel<fileInterface>({ user: userName, fileName: (req as any).file.filename, fileType: (req as any).file.mimetype, size: (req as any).file.size, fileId: (req as any).file.id });
        await itemDetail.save();
        await mongoose.disconnect();
        return res.status(200).send({ message: 'Image uploaded successfully' });
    })




});


app.get('/listUserUplaodItems', async (req: Request, res: Response) => {
    const $skip:any = req.query.$skip; 
    const $top:any = req.query.$top; 
    await mongoose.connect( 'mongodb://localhost:27017/UserUploadInfo');
    const UserModel = model<fileInterface>('fileInterface', schema);
    var data = await UserModel.find({fileType:'video/mp4'}).skip($skip).limit($top);
    var docCount =  await UserModel.find({fileType:'video/mp4'}).countDocuments()
    res.set('Access-Control-Expose-Headers', 'docCount')
    res.setHeader("docCount",docCount).json(data); 
})

app.get('/playVideo/:fileId', async (req: Request, res: Response) => {

    var id = req.params.fileId;    
    const dbConection = await mongoose.connect( 'mongodb://localhost:27017/UserUploadInfo');
    const FileModel = await model<file>('fs.files', schemaFile);
    // console.log(mongoose.ConnectionStates)
    var video  = await FileModel.find({filename:id});
    const range = req.headers.range;
    console.log('X',range)
    var videoSize = video[0]?.length;
    const Chunk_Size = 10 ** 5;
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

    const client = await new MongoClient('mongodb://localhost:27017');
    const db = await client.db('UserUploadInfo');
    var bucket = new GridFSBucket(db);
    const videodownloadStream = bucket.openDownloadStreamByName(video[0].filename,{
        start:start,
        end:end
      });

      console.log(streamCounter," start ",start," end ",end)
      streamCounter++;
      videodownloadStream.pipe(res);
    //   mongoose.disconnect();  
  
  });


app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
});




