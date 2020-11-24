import { FFGSquad } from "../../models/FFGSquad";
import request from "request-promise";

export async function getSquadJSON(squadId: string): Promise<FFGSquad> {
    // const url = `https://squadbuilder.fantasyflightgames.com/api/squads/${squadId}`;
    const url = `https://x-wing-api.fantasyflightgames.com/squads/${squadId}`;
    return await request(url)
        .then(response => {
            const result = <FFGSquad>JSON.parse(response)
            // console.log(result)
            return result;
        });
};
