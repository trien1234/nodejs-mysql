const jwtHelper = require("../Helpers/jwtHelper");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-smart-home";

let isAuth = async (req, res, next) => {
  const tokenFromClient = req.headers.authorization.replace('Bearer ','');
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
      req.body.UserId = decoded.data.Id;
      next();
    } catch (error) {

      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}
module.exports = {
  isAuth: isAuth,
};