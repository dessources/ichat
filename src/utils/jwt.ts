import jwt from "jsonwebtoken";

const generateToken = (payload: any) => {
  const token = jwt.sign(payload, <string>process.env.JWT_SECRET);
  return token;
};
const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, <string>process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
