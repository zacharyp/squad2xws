import { FFGSquad } from "../../models/FFGSquad";
import request from "request-promise";

export async function getSquadJSON(squadId: string): Promise<FFGSquad> {
    const url = `https://squadbuilder.fantasyflightgames.com/api/squads/${squadId}`;
    return await request(url)
        .then(response => <FFGSquad>JSON.parse(response));
};
