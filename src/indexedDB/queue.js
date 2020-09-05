/*
 * @Author: Pi Patle
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-09-01 10:43:53
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-09-02 19:50:44
 */

export class queue {
  constructor(semaphore,callback){
    this.array = [];
    this.semaphore = semaphore;
    this.threads = true;
    this.callback = callback;
  }
  enqueue(data){
    this.array.unshift(data);
    if(this.semaphore){
      this.dequeue();
    }
  }
  dequeue(){
    let x = ()=>{
      if(this.array.length>0){
        try{
          const front = this.array[this.array.length-1];
          this.array.pop();
          this.callback(front)
          x()
        }catch(e){
          console.error(e)
          x()
        }
      }else{
        this.semaphore = true;
      }
    }
    if(this.semaphore){
      this.semaphore = false;
      x()
    }
  }
  modificationSemaphore(semaphore){
    this.semaphore = semaphore
  }
}