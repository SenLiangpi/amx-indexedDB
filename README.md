<!--
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-06-17 15:38:23
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-09-30 09:42:51
 -->
# amx-indexeddb
amx 使用IndexedDB制作的基础本地数据存储，IndexedDB 数据存储空间非常大切支持各种数据类型。amx-indexeddb 使你使用 IndexedDB 技术更加方便。
<!-- Amx第一版组要支持vue，还在编写过程中。 -->

支持Amx技术：
* indexedDB - IndexedDB 是一个用于在浏览器中储存较大数据结构的 Web API, 并提供索引功能以实现高性能查找. 像其他基于 SQL 的 关系型数据库管理系统 (RDBMS) 一样, IndexedDB 是一个事务型的数据库系统. 然而, 它是使用 JavaScript 对象而非列数固定的表格来储存数据的.

github : https://github.com/SenLiangpi/amx-indexedDB

# 用法
安装 npm i web-logging
入口引入 與 使用
```javascript
  import amxIndexedDB from 'amx-indexeddb'
  const store = {
    v: 1,//版本
    name: 'amxDataDB',//數據庫名稱
    dbData:{
      SCP_MTF_Alpha_1:{},//表名稱
      SCP_MTF_Alpha_4:{},
      SCP_MTF_Alpha_9:{}
    }
  }
  amxIndexedDB.install(store)

  import dataDB from 'amx-indexeddb' //引入
  let SCP_MTF_Alpha_1 = new dataDB.db('SCP_MTF_Alpha_1')//獲取對應表的操作權限
```
# API
寫入 add
```javascript
// key //id
// value //支持幾乎所有數據類型 (err 錯誤類型不接受)
SCP_MTF_Alpha_1.add({key:key,value:json }).then((result) => {
  console.log('ok')
}).catch((err) => {
  console.log(err)
})
```
修改 update (如果修改id不存在則寫入該值)
```javascript
// key //id
// value //支持幾乎所有數據類型 (err 錯誤類型不接受)
SCP_MTF_Alpha_1.update({key:key,value:json }).then((result) => {
  console.log('ok')
}).catch((err) => {
  console.log(err)
})
```
讀取 read 
```javascript
// key //id
SCP_MTF_Alpha_1.read(key).then((result) => {
  console.log(result.result)
}).catch((err) => {
  console.log(err)
})
```
刪除 remove
```javascript
// key //id
SCP_MTF_Alpha_1.remove(key).then((result) => {
  console.log('delete')
}).catch((err) => {
  console.log(err)
})
```
批量讀取 readAll
```javascript
// condition //獲取規則
// 如果獲取該表所有數據 condition 傳入 undefined
// condition 規則比較複雜 請參考 indexeddb 文檔
let condition = IDBKeyRange.upperBound(1599125733694);// 該表 id 小於 1599125733694 的所有數據
condition = undefined;//獲取該表所有數據
SCP_MTF_Alpha_1.readAll(condition).then((result) => {
  console.log(result.length)
}).catch((err) => {
  console.log(err)
})
```
皮皮研究所出品