import { getFFGSquad } from "./providers/FFGProvider";
import { FFGSquad } from "./FFGSquad";

export async function getSquadJSON(squadId: string): Promise<FFGSquad> {    
  return await getFFGSquad(squadId).then(json => <FFGSquad>json);
};
