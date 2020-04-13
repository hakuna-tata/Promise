const Promise = require("../src/easy-sync-invoke.js");

new Promise((resolve, reject) => {
  resolve("成功");
})
.then((data) => {
  console.log("easy-syncInvoke data:", data);
}, (err) => {
  console.log("easy-syncInvoke err:", err);
})

new Promise((resolve, reject) => {
  reject("失败");
})
.then((data) => {
    console.log("easy-syncInvoke data:", data);
}, (err) => {
    console.log("easy-syncInvoke err:", err);
  }
)

new Promise((resolve, reject) => {
  throw new Error("出错啦");
})
.then((data) => {
    console.log("easy-syncInvoke data:", data);
}, (err) => {
    console.log("easy-syncInvoke err:", err);
  }
)