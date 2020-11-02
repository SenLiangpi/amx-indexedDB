<!--
 * @Author: Pi Patle
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-10-30 13:45:55
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-11-02 14:40:51
-->
<template>
  <div class="home" @click="sss($event)">
    <div class="button" ></div>
    <HelloWorld id="HelloWorld" msg="Welcome to Your Vue.js App"/>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
function domOpacity(dom,opacity,time){
  return new Promise((resolve, reject) => {
    let anim = setInterval(function() {
      if(opacity>0){
        opacity -= 0.04
        dom.style.opacity = String(opacity)
      }else{
        resolve()
      }
    }, time);
  })
}
function ceshi(e,dome){
  return new Promise((resolve, reject) => {
    let x = e.pageX,y = e.pageY,$elem = dome,//document.createElement("div"),
    clientWidth = window.screen.width,
    clientHeight = window.screen.height,one=0,qsd = 0,zengjiazhi = 0,
    $body = document.getElementsByTagName("body")[0];
    if(clientWidth>clientHeight){
      one = clientWidth
    }else{
      one = clientHeight
    }
    let two = Math.sqrt(Math.pow(clientWidth, 2)+Math.pow(clientHeight, 2))*2;
    console.log(two)
    // $elem.style.backgroundColor = "aqua";
    $elem.style.borderRadius = one/2+"px"
    $elem.style.width = zengjiazhi+'px';
    $elem.style.height = zengjiazhi+'px';
    // $elem.style.zIndex = 9999;
    $elem.style.position = "fixed";
    // $elem.style.select = "none";
    $elem.style.left = x+"px";
    $elem.style.top = y+"px";
    $elem.style.opacity = '1';
    $elem.style.transition= 'all 0.5s ease-out';
    qsd = two/30;
    // $body.appendChild($elem);
    let deleteDom = ()=>{
      transitionend_type++;
      $elem.style.opacity = '0';
    }
    let transitionend_type = 0;
    $elem.addEventListener('transitionend',()=>{
      if(transitionend_type == 0){
        transitionend_type++;
        // resolve(deleteDom)
      }else if(transitionend_type==2){
        transitionend_type++;
        // $body.removeChild($elem);
      }
    },false)
    setTimeout(()=> {
      $elem.style.left = 0+"px";
      $elem.style.top = 0+"px";
      $elem.style.width = 100+'vw';
      $elem.style.height = 100+'vh';
      $elem.style.borderRadius = 0+"px";
    },70)
    // let anim = setInterval(function() {
    //   if(zengjiazhi<two){
    //     zengjiazhi+=qsd;
    //     $elem.style.width = zengjiazhi+'px';
    //     $elem.style.height = zengjiazhi+'px';
    //     $elem.style.left = x-(zengjiazhi/2)+"px";
    //     $elem.style.top = y-(zengjiazhi/2)+"px";
    //   }else{
    //     clearInterval(anim);
    //     let deleteDom = ()=>{
    //       domOpacity($elem,1,5).then((requesr)=>{
    //         $body.removeChild($elem);
    //       })
    //       // $body.removeChild($elem);
    //     }
    //     resolve(deleteDom)
    //   }
    // }, 10);
  }).catch(err => {
    reject(err)
  })
}
function ceshi1(e,dome){
  return new Promise((resolve, reject) => {
    let x = e.pageX,y = e.pageY,$elem = document.createElement("div"),
    clientWidth = window.screen.width,
    clientHeight = window.screen.height,one=0,qsd = 0,zengjiazhi = 0,
    $body = document.getElementsByTagName("body")[0];
    if(clientWidth>clientHeight){
      one = clientWidth
    }else{
      one = clientHeight
    }
    let two = Math.sqrt(Math.pow(clientWidth, 2)+Math.pow(clientHeight, 2))*2;
    console.log(two)
    $elem.style.backgroundColor = "aqua";
    $elem.style.borderRadius = one/2+"px"
    $elem.style.width = zengjiazhi+'px';
    $elem.style.height = zengjiazhi+'px';
    $elem.style.zIndex = 9999;
    $elem.style.position = "fixed";
    // $elem.style.select = "none";
    $elem.style.left = x+"px";
    $elem.style.top = y+"px";
    $elem.style.opacity = '1';
    // $elem.style.transition= 'all 0.5s ease-out';
    qsd = two/60;
    $body.appendChild($elem);
    let anim = setInterval(function() {
      if(zengjiazhi<two){
        zengjiazhi+=qsd;
        $elem.style.width = zengjiazhi+'px';
        $elem.style.height = zengjiazhi+'px';
        $elem.style.left = x-(zengjiazhi/2)+"px";
        $elem.style.top = y-(zengjiazhi/2)+"px";
      }else{
        clearInterval(anim);
        let deleteDom = ()=>{
          domOpacity($elem,1,10).then((requesr)=>{
            $body.removeChild($elem);
          })
          // $body.removeChild($elem);
        }
        resolve(deleteDom)
      }
    }, 10);
  }).catch(err => {
    reject(err)
  })
}
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    sss(e){
      // let HelloWorld_dom = document.getElementById('HelloWorld')
      // ceshi(e,HelloWorld_dom).then((request)=>{
      //   // this.$router.push('/about')
      //   request()
      // })
      ceshi1(e).then((request)=>{
        // this.$router.push('/about')
        request()
      })
    }
  },
}
</script>
<style scoped>
.home{
  width: 100vw;
  height: 100vh;
}
  .button{
    margin: 10px;
    height: 50px;
    width: 100px;
    border-radius: 5px;
    background-color: aqua;
  }
</style>
