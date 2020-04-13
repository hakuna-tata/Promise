/**
 * 处理异步调用简易实现
 **/

// 定义三个常量表示 Promise 的状态
// 等待状态 可以变更为成功或失败
const PENDING = "PENDING";
// 成功状态
const RESOLVED = "RESOLVED";
// 失败状态
const REJECTED = "REJECTED";

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
    if(this.state === RESOLVED){
      onFulfilled(this.value);
    }

    if(this.state === REJECTED){
      onRejected(this.reason);
    }
    // 当 Promise 状态为等待状态 (pending) 时，将 onFulfilled 和 onRejected 存入对应的回调队列
    if(this.state === PENDING){
      this.resolvedCallbacks.push(() => {
        onFulfilled(this.value);
      })
      this.rejectedCallbacks.push(() => {
        onRejected(this.reason);
      })
    }
  }
}

module.exports = Promise;