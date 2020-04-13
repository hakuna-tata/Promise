/**
 * 支持链式调用简易实现
 **/

 // 定义三个常量表示 Promise 的状态
// 等待状态 可以变更为成功或失败
const PENDING = "PENDING";
// 成功状态
const RESOLVED = "RESOLVED";
// 失败状态
const REJECTED = "REJECTED";

/**
 * 工具方法
 **/
function nextTick(fn) {
  setTimeout(fn, 0);
}

class Promise{
   /**
   * 在 new Promise 的时候会传入一个执行器 (executor) 同时这个执行器是立即执行的
   * state              Promise 的初始状态为等待状态
   * value              成功的值
   * reason             失败的原因
   * resolvedCallbacks  resolve 回调队列
   * rejectedCallbacks  reject 回调队列
   **/
  constructor(executor){
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (value) => {
      if(this.state === PENDING){
        this.state = RESOLVED;
        this.value = value;
        this.resolvedCallbacks.forEach(cb => cb());
      }
    } 

    const reject = (reason) => {
      if(this.state === PENDING){
        this.state = REJECTED;
        this.reason = reason;
        this.rejectedCallbacks.forEach(cb => cb());
      }
    }
    
    /**
     * 执行器 (executor) 接收两个参数，分别是 resolve, reject
     * 为了防止执行器 (executor) 在执行时出错，需要进行错误捕获，并将错误传入 reject 函数
     */
    try{
      executor(resolve, reject);
    }catch(e){
      reject(e);
    }
  }

  /**
   * then 方法接收两个参数 onFulfilled 和 onRejected
   */
  then(onFulfilled, onRejected){
    /**
     * 在链式调用时需要返回一个新的 promise
     * 在 then 函数中，无论是成功还是失败的回调，只要返回了结果就会传入下一个 then 的成功回调
     * 如果出现错误就会传入下一个 then 的失败回调
     * 即：下一个 then 的状态和上一个 then 执行时候的状态无关
     * 所以在 then 执行的时候 onFulfilled, onRejected 可能会出现错误，需要捕获错误，并执行失败回调（处理成失败状态）
     */
    return new Promise((resolve, reject) => {
      if(this.state === RESOLVED){
        nextTick(() => {
          try{
            // 为了链式调用，需要获取 onFulfilled 函数执行的返回值，通过 resolve 返回
            let x = onFulfilled(this.value);
            resolve(x);
          }catch(e){
            reject(e);
          }
        })
      }
      if(this.state === REJECTED){
        nextTick(() => {
          try{
            // 为了链式调用，需要获取 onRejected 函数执行的返回值，通过 resolve 返回
            let x = onRejected(this.reason);
            resolve(x);
          }catch(e){
            reject(e);
          }
        })
      }
      if(this.state === PENDING){
        this.resolvedCallbacks.push(() => {
          nextTick(() => {
            try{
              let x = onFulfilled(this.value);
              resolve(x);
            }catch(e){
              reject(e);
            }
          })
        })
        this.rejectedCallbacks.push(() => {
          nextTick(() => {
            try{
              let x = onRejected(this.reason);
              resolve(x);
            }catch(e){
              reject(e);
            }
          })
        })
      }
    })
  }
}

module.exports = Promise;