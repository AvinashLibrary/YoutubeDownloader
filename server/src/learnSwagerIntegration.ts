import express, { Request, Response, Application } from 'express';
const app: Application = express();
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

var options: cors.CorsOptions = { origin: 'http://localhost:4200', credentials: true }

const PORT = 3000;


app.use(express.json());
app.use(cors(options));

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/', (req: Request, res: Response) => {
    res.send('Its connect now Learning Swagger File')
})

interface user {
    name: string
}

app.get('/users', (req: Request, res: Response) => {

    var users: user[];
    users = [{
        name: 'Avinash'
    }, {
        name: 'Rahul'
    }, {
        name: 'Vishwa'
    }, {
        name: 'Rohit'
    }];

    res.json(users)
})

app.post('/addNewUser', (req: Request, res: Response) => {
    res.status(201);
    res.send({ value: 'user is added' });
})

app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
