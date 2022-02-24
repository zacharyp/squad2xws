import { Request, Response } from "express";
import { covert_xws } from "./YASBReverse";
import { serializedToXWS } from "./YASBXWS"

export interface YASBURL {
    url: string;
}

export default [
    {
        path: '/yasb/xws',
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                let fQuery = req.query.f
                let dQuery = req.query.d
                let snQuery = req.query.sn
                let obsQuery = req.query.obs

                if (fQuery !== undefined && dQuery !== undefined) {
                    let query = req.url.split('?')[1]
                    const xwsObj = await serializedToXWS(fQuery, dQuery, snQuery, obsQuery, query)
                    res.status(200).contentType("application/json").send(xwsObj)
                } else {
                    res.status(400).contentType("application/json").send('{"error": "Put YASB permalink query string in URL"}')
                }
            }
        ]
    },
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
