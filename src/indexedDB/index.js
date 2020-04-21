/*
 * @Author: PiPi
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-04-20 10:20:48
 * @LastEditors: PiPi
 * @LastEditTime: 2020-04-21 10:21:03
 */

export default class amxIndexedDB {
  constructor(json){
    this.V = json.v
    this.dbName = json.db
    this.dbData = json.dbData
  }
  open(){
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
    return new Promise((resolve, reject)=>{
      let indexDB = window.indexedDB.open(this.dbName, this.V)
      indexDB.onsuccess = (event)=>{
        this.db = indexDB.result
        resolve(false)
      }
      indexDB.onerror = (err)=>{
        reject(err)
      }
      indexDB.onupgradeneeded = (event)=>{
        this.db = event.target.result
        for(let a in this.dbData){
          if(!this.db.objectStoreNames.contains(a)){
            const objectStore =  this.db.createObjectStore(a, { keyPath: 'key' })
            objectStore.transaction.oncomplete = (e)=>{
              resolve(true)
            }
          }
        }
        resolve(true)
      }
    })
  }
  addData(name,json){
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
  read(name,key){
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
  readAll(name){
    return new Promise((resolve, reject)=>{
      try {
        var objectStore = this.db.transaction(name).objectStore(name),json = []
        objectStore.openCursor().onsuccess = (event)=>{
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
  update(name,json){
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
  remove(name,key){
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
}