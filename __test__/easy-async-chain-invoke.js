const Promise = require("../src/easy-async-chain-invoke.js");

new Promise((resolve, reject) => {
  resolve("成功");
})
.then(data => {
  console.log("easy-chain-invoke data 1:", data);
  throw new Error("easy-chain-invoke 出错啦!");
}, err => {
  console.log("easy-chain-invoke err 1:", err);
})
.then(data => {
  console.log("easy-chain-invoke data 2:", data);
  return 2;
}, err => {
  console.log("easy-chain-invoke err 2:", err);
})
.then(data => {
  console.log("easy-chain-invoke data 3:", data);
  return 2;
}, err => {
  console.log("easy-chain-invoke err 3:", err);
})