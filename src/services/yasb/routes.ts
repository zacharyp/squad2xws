import { Request, Response } from "express";
import { covert_xws } from "./YASBReverse";

export default [
    {
        path: '/dolphin/:squadId',
        method: "get",
        handler: [
            (req: Request, res: Response) => {
                const squadId = req.params.squadId;
                res.status(200).send(squadId);
            }
        ]
    },
    {
        path: '/yasb/reverse',
        method: "post",
        handler: [
            async (req: Request, res: Response) => {
                let xwsString = JSON.stringify(req.body)
                const squad: string = await covert_xws(xwsString);
                res.status(200).send(squad);
            }
        ]
    }
];
