import { Request, Response } from "express";
import { getSquadJSON } from "./SquadController";
import { FFGSquad } from "./FFGSquad";
// import { checkSearchParams } from "../../middleware/checks";

export default [
  {
    path: '/squad/translate/:squadId',
    method: "get",
    handler: [
    //   checkSearchParams,
      async (req: Request, res: Response) => {
        const result: FFGSquad = await getSquadJSON(req.params.squadId);



        res.status(200).send(result);
      }
    ]
  }
];
