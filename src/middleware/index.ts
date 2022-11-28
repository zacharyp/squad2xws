import {
  handleRobots,
  handleCors,
  handleBodyRequestParsing,
  handleCompression
} from "./common";

import { handleAPIDocs } from "./apiDocs";

export default [
  handleRobots,
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleAPIDocs
];
