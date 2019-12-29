import request from "request-promise";
// import dotenv from "dotenv";

// dotenv.config();

export const getFFGSquad = async (squadId: string) => {
//   const key = process.env.OPEN_CAGE_DATA_KEY;
  const url = `https://squadbuilder.fantasyflightgames.com/api/squads/${squadId}`;
  const response = await request(url);
  return JSON.parse(response);
};
