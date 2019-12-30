import request from "request-promise";

export const getFFGSquad = async (squadId: string) => {
  const url = `https://squadbuilder.fantasyflightgames.com/api/squads/${squadId}`;
  return await request(url)
    .then(response => JSON.parse(response));
};
