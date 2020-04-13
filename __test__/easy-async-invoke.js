const Promise = require("../src/easy-async-invoke.js");

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功");
  }, 1e3)
})
.then((data) => {
  console.log("easy-asyncInvoke data:", data);
}, (err) => {
  console.log("easy-asyncInvoke err:", err);
})

new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("失败")
  }, 1e3)
})
.then((data) => {
  console.log("easy-asyncInvoke data:", data);
}, (err) => {
  console.log("easy-asyncInvoke err:", err);
})

const p = new Promise((resolve, reject) => {
  throw new Error("出错啦");
})
.then((data) => {
    console.log("easy-asyncInvoke data:", data);
}, (err) => {
    console.log("easy-asyncInvoke err:", err);
  }
)