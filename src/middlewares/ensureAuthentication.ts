import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import tokenConfig from "../config/tokenConfig";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ error: "User without permission" });
  }

  const token = authorization.slice(7);

  try {
    const { secureKey } = tokenConfig.jwt;

    const validateToken = verify(token, secureKey) as TokenPayload;

    req.user = {
      id: validateToken.sub,
    };

    return next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

export default ensureAuthentication;
