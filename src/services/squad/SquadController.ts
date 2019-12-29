import { getFFGSquad } from "./providers/FFGProvider";

export const getSquadJSON = async (squadId: string) => {
//   if (q.length < 3) {
//     return {
//       type: "FeatureCollection",
//       features: []
//     };
//   }

  return await getFFGSquad(squadId);
};
