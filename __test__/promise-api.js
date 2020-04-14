const Promise = require("../src/promise.js");

console.log('------ catch ------')
new Promise((resolve, reject) => {
  reject("bug");
})
.then(data => {
  console.log("success data:", data);
})
.catch(err => {
  console.log("fail err:", err);
})

new Promise((resolve, reject) => {
  resolve(x + 2);
})
.catch(err => {
  console.log("fail err:", err);
})
.then(data => {
  console.log("success data:", data);
})