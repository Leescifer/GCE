import express, { Request, Response } from 'express'
import auth from "./routes/auth.route";
import clerk from "./routes/clerk.route";

const app = express();

app.use(express.json());

//Routes
app.use("/api/auth", auth);
app.use("/api/clerk", clerk);


app.get("/", (req: Request, res: Response) => {
    res.send("Server is running fine");
})

export default app;

