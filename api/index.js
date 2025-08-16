const jsonServer = require("json-server");
const path = require("path");

// Khởi tạo server json-server
const server = jsonServer.create();

// Tạo router trỏ đến file db.json
// __dirname trỏ đến thư mục hiện tại (/api), nên chúng ta cần đi ra ngoài 1 cấp ('..') để tìm db.json
const router = jsonServer.router(path.join(__dirname, "..", "db.json"));

// Sử dụng các middleware mặc định (logger, static, cors, no-cache)
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Export server để Vercel có thể sử dụng
module.exports = server;
