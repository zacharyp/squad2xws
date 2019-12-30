import { Request, Response } from "express";
import { getSquadJSON } from "./SquadController";
import { convertFFGSquad } from "./SquadXWSConverter"
import { FFGSquad } from "../../models/FFGSquad";
import { XWSSquadron } from "../../models/XWSSquadron";

export default [
    {
        path: '/squad/translate/:squadId',
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const squadId = req.params.squadId;
                const squad: FFGSquad = await getSquadJSON(squadId);
                const xwsSquadron: XWSSquadron = convertFFGSquad(squadId, squad)
                res.status(200).send(xwsSquadron);
            }
        ]
    }
];
