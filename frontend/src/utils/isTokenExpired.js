import {decodeToken} from "./decodeToken";

export const isTokenExpired = (token) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken) return true;
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

