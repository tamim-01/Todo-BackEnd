const apiLogger = (req, res, next) => {
  console.log(`${req.method}- ${req.path}-${req.ip}`);
  next();
};

const routeNotFound = (req, res, next) => {
  res.status(404).json({ message: `the route ${req.path} is not found` });
};

// const authorization = (req, res, next) => {
//   console.log(req);
//   next();
// };
export { apiLogger, routeNotFound };
