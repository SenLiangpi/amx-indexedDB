/*
 * @Author: Pi Patle
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-10-30 13:45:55
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-10-30 14:06:01
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import indexeddb from './amx-indexeddb/src/index'
// let data = {}
// for(let a = 0;a<10000;a++){
//   data['pipi'+a] = {}
// }
let store = {
  v: 1,
  name: 'pipi',
  dbData:{
    SCP_MTF_Alpha_1:{},
    SCP_MTF_Alpha_4:{},
    SCP_MTF_Alpha_9:{}
  }
}
indexeddb.install(store)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
