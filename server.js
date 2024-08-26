const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./data/Todos.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  console.log("request received");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-control-allow-method",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "access-control-header-headers",
    "origin, x-requested-with, content-type, accept"
  );
  next();
});
server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running on 3001");
});
