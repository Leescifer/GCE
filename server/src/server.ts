import express, { Request, Response } from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import auth from "./routes/auth.route";
import clerk from "./routes/clerk.route";

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigin = process.env.APP_URL?.trim().replace(/\/$/, "");

app.use(cors({
    origin: process.env.APP_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "X-Project-ID"]
}));
console.log(allowedOrigin);

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));

//Routes
app.use("/api/auth", auth);
app.use("/api/clerk", clerk);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Not found"
    });
});

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running fine");
})

export default app;

