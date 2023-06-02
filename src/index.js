/*
 * @Author: PiPi
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-04-20 10:21:32
 * @LastEditors: Pi Patle
 * @LastEditTime: 2023-06-02 16:13:53
 */
import amxIndexedDB from './indexedDB/index'
// import { queue } from './indexedDB/queue.js'
import { queue_basis } from 'alml'

//   type: '操作类型',
//    type: 
//      add:添加，storeNames,data
//      read:获取数据，storeNames,key
//      readAll:获取对应表范围中的所有数据，storeNames,condition
//      update:修改数据，storeNames,data
//      remove:删除数据，storeNames,key
//      allLength:对应表的总数据条数，storeNames
//   storeNames: '操作表名',
//   data: '添加或修改的数据',
//   key: '对应表数据的key 删除或获取数据时使用',
//   condition: '获取对应表范围中的所有数据'
//   callback: ()=>{} 回调函数
const dataDB = {}
let amxDataDBOpenDb,
amxDataDBQueue = new queue_basis({lock: false,callback:(data)=>{
  switch (data.type) {
    case 'add':
      amxDataDBOpenDb.addData(data.storeNames,data.data).then((result) => {
        data.callback({code: true,result: result})
      }).catch((err) => {
        data.callback({code: false,result: err})
      })
      break;
    case 'read':
      amxDataDBOpenDb.read(data.storeNames,data.key).then((result) => {
        data.callback({code: true,result: result})
      }).catch((err) => {
        data.callback({code: false,result: err})
      })
      break;
    case 'readAll':
      amxDataDBOpenDb.readAll(data.condition,data.storeNames).then((result) => {
        data.callback({code: true,result: result})
      }).catch((err) => {
        data.callback({code: false,result: err})
      })
      break;
    case 'update':
      amxDataDBOpenDb.update(data.storeNames,data.data).then((result) => {
        data.callback({code: true,result: result})
      }).catch((err) => {
        data.callback({code: false,result: err})
      })
      break;
    case 'remove':
      amxDataDBOpenDb.remove(data.storeNames,data.key).then((result) => {
        data.callback({code: true,result: result})
      }).catch((err) => {
        data.callback({code: false,result: err})
      })
      break;
    case 'allLength':
      amxDataDBOpenDb.allLength(data.storeNames).then((result) => {
        data.callback({code: true,result: result})
      }).catch((err) => {
        data.callback({code: false,result: err})
      })
      break;
  }
}});
dataDB.install = (store)=>{
  //初始化值
  store.dbData.interface_data_cache = {}
  amxDataDBOpenDb = new amxIndexedDB({
    v: store.v,
    db: store.name,
    dbData: store.dbData
  })
  amxDataDBOpenDb.open().then((result) => {
    amxDataDBQueue.controller(true)
    amxDataDBQueue.dequeue()
    if(result){//判断是否版本更新
      
    }
  }).catch((err) => {
    console.log(err)
  });
}
dataDB.db = class {
  constructor(name){//初始化参数
    this.name = name
  }
  add(json){//添加
    return new Promise((resolve, reject)=>{
      json.creation_time = new Date().getTime();
      amxDataDBQueue.enqueue({
        type: 'add',
        storeNames: this.name,
        data: json,
        callback: (data)=>{
          if(data.code){
            resolve(data.result)
          }else{
            reject(data.result)
          }
        }
      })
    })
  }
  read(key){//获取
    return new Promise((resolve, reject)=>{
      amxDataDBQueue.enqueue({
        type: 'read',
        storeNames: this.name,
        key: key,
        callback: (data)=>{
          if(data.code){
            if(data.result.result){
              if(data.result.result.expiration_time){
                if((data.result.result.creation_time+data.result.result.expiration_time)>new Date().getTime()){
                  resolve(data.result)
                }else{
                  amxDataDBQueue.enqueue({
                    type: 'remove',
                    storeNames: this.name,
                    key: key,
                    callback: (data)=>{
                      if(data.code){
                        amxDataDBQueue.enqueue({
                          type: 'read',
                          storeNames: this.name,
                          key: key,
                          callback: (data)=>{
                            if(data.code){
                              resolve(data.result)
                            }else{
                              reject(data.result)
                            }
                          }
                        })
                      }else{
                        reject(data.result)
                      }
                    }
                  })
                }
              }else{
                resolve(data.result)
              }
            }else{
              resolve(data.result)
            }
          }else{
            reject(data.result)
          }
        }
      })
    })
  }
  readAll(condition){//获取对应表范围中的所有数据
    return new Promise((resolve, reject)=>{
      amxDataDBQueue.enqueue({
        type: 'readAll',
        storeNames: this.name,
        condition: condition,
        callback: (data)=>{
          if(data.code){
            resolve(data.result)
          }else{
            reject(data.result)
          }
        }
      })
    })
  }
  update(json){//修改
    json.creation_time = new Date().getTime();
    return new Promise((resolve, reject)=>{
      amxDataDBQueue.enqueue({
        type: 'update',
        storeNames: this.name,
        data: json,
        callback: (data)=>{
          if(data.code){
            resolve(data.result)
          }else{
            reject(data.result)
          }
        }
      })
    })
  }
  remove(key){//删除
    return new Promise((resolve, reject)=>{
      amxDataDBQueue.enqueue({
        type: 'remove',
        storeNames: this.name,
        key: key,
        callback: (data)=>{
          if(data.code){
            resolve(data.result)
          }else{
            reject(data.result)
          }
        }
      })
    })
  }
  allLength(){//获取总数据条数
    return new Promise((resolve, reject)=>{
      amxDataDBQueue.enqueue({
        type: 'allLength',
        storeNames: this.name,
        callback: (data)=>{
          if(data.code){
            resolve(data.result)
          }else{
            reject(data.result)
          }
        }
      })
    })
  }
}
let interfaceDataCache = new dataDB.db('interface_data_cache')
/**
 * @Author: Pi Patle
 * @description: IFDataCache，用于处理接口数据缓存
 * @param {String} key 存储使用的唯一key
 * @param {Function} inter 接口函数
 * @param {Number} expirationTime 存储数据失效时间，number类型 单位毫秒；此字段非必填，不填永久有效
 * @return {Function}
 */
dataDB.IFDataCache = (key, inter, expirationTime) => {
  return async (params)=>{
    // 从缓存中读取数据
    const result = await interfaceDataCache.read(key)
    if (result.result) {
      return result.result.value
    } else {
      // 调用接口函数获取数据
      const request = await inter(params)
      // 更新缓存数据
      interfaceDataCache.update({
        key: key,
        value: request,
        expiration_time: expirationTime,
      })
      return request
    }
  }
}

export default dataDB;