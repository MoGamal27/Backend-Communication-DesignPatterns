import express, { Request, Response } from 'express';

const app = express();

app.get("/", (req: Request, res: Response) => res.send("hello!"));

app.get("/stream", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/event-stream");
    send(res);
});

const port = process.env.PORT || 3000;

let i = 0;

function send(res: Response) {
    res.write(`data: hello from server ---- [${i++}]\n\n`);
    setTimeout(() => send(res), 1000);
}

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
