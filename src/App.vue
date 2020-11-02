<!--
 * @Author: Pi Patle
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-10-30 13:45:55
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-10-30 17:37:20
-->
<template>
  <div id="app">
    <div id="nav">
    </div>
    <!-- <transition :name="transitionName"> -->
      <router-view class="view"></router-view>
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'fold-left'
    }
  },
  // vue监听路由对象$route的方法
  watch: {
    // watch $route 决定使用哪种过渡
    '$route' (to, from) {
      // console.log(from); // '/'
      // console.log(to); // '/next1'
      //to、from是最基本的路由对象，分别表示从(from)某个页面跳转到(to)另一个页面,to.path（表示要跳转到的路由地址），from.path同理。
      // const routerDeep = ['/', '/about'];
      // //找到to.path和from.path在routerDeep数组中的下标
      // const toDepth = routerDeep.indexOf(to.path);
      // const fromDepth = routerDeep.indexOf(from.path);
      // this.transitionName = toDepth > fromDepth ? 'fold-left' : 'fold-right';
      // this.transitionName = 'fold-right'
      // if(this.transitionName == 'fold-left'){
      //   this.transitionName = 'fold-right'
      // }else if(this.transitionName == 'fold-right'){
      //   this.transitionName = 'fold-left'
      // }
    }
  }
}
</script>
<style>
*{margin: 0;padding: 0;}
.view{
  position:absolute;
}
.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: .3s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: .3s;
}
@keyframes fold-left-in {
  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    /* visibility: visible; */
  }
  /*50% {
    transform: translate3d(50%, 0, 0);
  }*/
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  /*50% {
    transform: translate3d(-50%, 0 , 0);
  }*/
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    /* visibility: hidden; */
  }
}
.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: .3s;
}
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: .3s;
}
@keyframes fold-right-in{
  0% {
    width: 100%;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    /* visibility: visible; */
  }
  /*50% {
    transform: translate3d(50%, 0, 0);
  }*/
  100% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-right-out  {
  0% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  /*50% {
    transform: translate3d(-50%, 0 , 0);
  }*/
  100% {
    width: 100%;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    /* visibility: hidden; */
  }
}
</style>
