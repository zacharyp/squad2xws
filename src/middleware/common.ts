import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";

export const handleRobots = (router: Router) => {
  router.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send(
        `User-agent: *\nDisallow: /`);
  });
};

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: false }));
  router.use(parser.json());
};

export const handleCompression = (router: Router) => {
  router.use(compression());
};
