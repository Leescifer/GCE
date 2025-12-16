import express, { Request, Response } from 'express'
import auth from "./routes/auth.route";

const app = express();

app.use(express.json());

//Routes
app.use("/api/auth", auth);


app.get("/", (req: Request, res: Response) => {
    res.send("Server is running fine");
})


export default app;

