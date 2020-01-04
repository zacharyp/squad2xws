import { Request, Response } from "express";
import { covert_xws } from "./YASBReverse";

export interface YASBURL {
    url: string;
}

export default [
    {
        path: '/yasb/reverse',
        method: "post",
        handler: [
            async (req: Request, res: Response) => {
                let xwsString = JSON.stringify(req.body)
                const squadURL: string = await covert_xws(xwsString);
                const xwsSquadron = <YASBURL>{
                    url: squadURL
                }   
                res.status(200).contentType("application/json").send(xwsSquadron);
            }
        ]
    }
];
