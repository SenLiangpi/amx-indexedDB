/*
 * @Author: PiPi
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-04-20 10:20:48
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-09-03 15:24:13
 */

export default class amxIndexedDB {
  constructor(json){//初始参数
    this.V = json.v
    this.dbName = json.db
    this.dbData = json.dbData
  }
  open(){
    if (!window.indexedDB) {//检测是否支持indexedDB
      window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
    return new Promise((resolve, reject)=>{
      //链接数据库
      let indexDB = window.indexedDB.open(this.dbName, this.V)
      indexDB.onsuccess = (event)=>{//链接成功
        this.db = indexDB.result
        resolve(false)
      }
      indexDB.onerror = (err)=>{//链接失败
        reject(err)
      }
      indexDB.onupgradeneeded = (event)=>{//数据库版本更新
        this.db = event.target.result
        for(let a in this.dbData){
          if(!this.db.objectStoreNames.contains(a)){//判断表名是否存在
            const objectStore =  this.db.createObjectStore(a, { keyPath: 'key' })//创建表
            objectStore.transaction.oncomplete = (e)=>{
              resolve(true)
            }
          }
        }
      }
    })
  }
  addData(name,json){//新增数据
    return new Promise((resolve, reject)=>{
      try {
        var request = this.db.transaction([name], 'readwrite').objectStore(name).add(json)
        request.onsuccess = (event)=> {
          resolve(event)
        }
        request.onerror = (err)=> {
          reject(err)
        }
      }catch(error) {
        console.log(error)
        reject(false)
      }
    })
  }
  read(name,key){//获取数据
    return new Promise((resolve, reject)=>{
      try {
        var request = this.db.transaction([name]).objectStore(name).get(key)
        request.onsuccess = (event)=>{
          resolve(request)
        }
        request.onerror = (err)=> {
          reject(err)
        }
      }catch(error) {
        console.log(error)
        reject(false)
      }
    })
  }
  readAll(condition,name){//获取表的全部数据
    return new Promise((resolve, reject)=>{
      try {
        var objectStore = this.db.transaction(name).objectStore(name),json = []
        objectStore.openCursor(condition).onsuccess = (event)=>{
          let cursor = event.target.result
          if(cursor){
            json.push(cursor.value)
            cursor.continue()
          }else{
            resolve(json)
          }
        }
      }catch(error){
        console.log(error)
        reject(false)
      }
    })
  }
  update(name,json){//修改数据
    return new Promise((resolve, reject)=>{
      try {
        var request = this.db.transaction([name], 'readwrite').objectStore(name).put(json)
        request.onsuccess = (event)=>{
          resolve(event)
        }
        request.onerror = (err)=>{
          reject(err)
        }
      }catch(error) {
        console.log(error)
        reject(false)
      }
    })
  }
  remove(name,key){//删除数据
    return new Promise((resolve, reject)=>{
      try {
        var request = this.db.transaction([name], 'readwrite').objectStore(name).delete(key)
        request.onsuccess = (event)=>{
          resolve(event)
        }
        request.onerror = (err)=>{
          reject(err)
        }
      }catch(error) {
        console.log(error)
        reject(false)
      }
    })
  }
  allLength(name){
    return new Promise((resolve, reject)=>{
      try {
        var request = this.db.transaction([name], 'readonly').objectStore(name).count()
        request.onsuccess = ()=>{
          resolve(request.result)
        }
        request.onerror = (err)=>{
          reject(err)
        }
      }catch(error) {
        console.log(error)
        reject(false)
      }
    })
  }
}