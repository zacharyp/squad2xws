import { Request, Response } from "express";
import { getSquadJSON } from "./SquadController";
// import { checkSearchParams } from "../../middleware/checks";

export default [
  {
    path: '/squad/translate/:squadId',
    method: "get",
    handler: [
    //   checkSearchParams,
      async (req: Request, res: Response) => {
        const result = await getSquadJSON(req.params.squadId);
        res.status(200).send(result);
      }
    ]
  }
];
