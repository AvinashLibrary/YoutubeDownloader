import express, { Request, Response, Application } from 'express';
const app: Application = express();
import cors from 'cors';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
const { GridFsStorage } = require('multer-gridfs-storage');



var options: cors.CorsOptions = { origin: 'http://localhost:4200', credentials: true }
const url = 'mongodb://localhost:27017';

app.use(express.json());
app.use(cors(options));

require('dotenv').config();

const PORT = 3000;


app.get("/", (req: Request, res: Response): void => {
    res.send("Hello Typescript with Node tester!")
});



// const storage = new GridFsStorage({ url: 'mongodb://localhost:27017/videos', options: {useUnifiedTopology: true},});

// const upload: multer.Multer = multer({
//     storage
// });


// const connection  = conn.connection;
// const storage : multer.StorageEngine = new GridFsStorage({
//     db: connection.db,
// });

// const upload: multer.Multer = multer({
//     storage
// });
// conn.once('open', () => {

//     console.log(storage);

// });


app.post('/uploadfileToNodeMutler', async (req: Request, res: Response) => {
    
    const storage = new GridFsStorage({ url: 'mongodb://localhost:27017/videos', options: {useUnifiedTopology: true},});

    const upload: multer.Multer = multer({
            storage
     });

    const test = upload.single('avatar');

    test(req, res, function (err:any) {
        return res.status(200).send({ message: 'Image uploaded successfully' });
    })
        
    
    
   
});







app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
