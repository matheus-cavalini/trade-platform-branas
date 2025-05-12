import express, { Express, Request, Response } from "express";
import cors from "cors";

export default interface HttpServer {
    route(method: string, url: string, callback: Function): void;
    listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {

    app: Express

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors())
    }

    route(method: "get" | "post" | "put" | "delete", url: string, callback: Function): void {
        this.app[method](url, async (req: Request, res: Response) => {
            try {
                const output = await callback(req.params, req.body)
                res.json(output)
            } catch (e: any) {
                res.status(422).json({
                    error: e.message
                });
            }
        })
    }

    listen(port: number): void {
        this.app.listen(3000)
    }
}