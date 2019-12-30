import { Request, Response } from "express";
import { getSquadJSON } from "./SquadController";
import { FFGSquad } from "./FFGSquad";
import { XWSSquadron, Vendor } from "../../models/XWSSquadron";
// import { checkSearchParams } from "../../middleware/checks";

function xwsFaction(id: number): string {
    switch (id) {
        case 1: return "rebelalliance"
        case 2: return "galacticempire"
        case 3: return "scumandvillainy"
        case 4: return "resistance"
        case 5: return "firstorder"
        case 6: return "galacticrepublic"
        default: return "separatistalliance"
    }
}

export default [
    {
        path: '/squad/translate/:squadId',
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const squadId = req.params.squadId;
                const squadron: FFGSquad = await getSquadJSON(squadId);

                const factionId = squadron.faction.id

                const vender = <Vendor>{
                    builder: 'squad2xws',
                    builder_url: 'http://squad2xws.herokuapp.com/',
                    url: `http://squad2xws.herokuapp.com/squad/translate/${squadId}`
                }

                const xwsSquadron = <XWSSquadron>{
                    faction: xwsFaction(factionId),
                    pilots: [],
                    name: squadron.name,
                    description: squadron.description,
                    obstacles: undefined,
                    points: squadron.cost,
                    vender: vender
                }

                res.status(200).send(xwsSquadron);
            }
        ]
    }
];
