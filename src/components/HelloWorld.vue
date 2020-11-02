<!--
 * @Author: Pi Patle
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-10-30 13:45:55
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-11-02 14:18:05
-->
<template>
  <div class="hello" :class="{'hello2': xx}" v-if='zz'>
    <h1 @click="aaa($event)">返回</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
    <h1>111111111111</h1>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data() {
    return {
      xx: false,
      zz: true
    };
  },
  props: {
    msg: String
  },
  methods: {
    aaa(e){
      let x = e.pageX,y = e.pageY,dom = document.getElementById('HelloWorld'),
      clientWidth = window.screen.width,
      clientHeight = window.screen.height,one;
      if(clientWidth>clientHeight){
        one = clientWidth
      }else{
        one = clientHeight
      }
      dom.style.left = x+"px";
      dom.style.top = y+"px";
      dom.style.width = 0+'vw';
      dom.style.height = 0+'vw';
      dom.style.borderRadius = one/2+"px";
    }
  },
  created(){
    // let $html = document.getElementsByTagName("html")[0];
    // let $body = document.getElementsByTagName("body")[0];
    // $html.onclick = function(e) {
    //   let $elem = document.createElement("b");
    //   $elem.style.color = "#e91e63";
    //   $elem.style.zIndex = 9999;
    //   $elem.style.position = "fixed";
    //   $elem.style.select = "none";
    //   let x = e.pageX;
    //   let y = e.pageY;
    //   $elem.style.left = x + "px";
    //   $elem.style.top = y + "px";
    //   console.log(x,y)
    // };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
    position: absolute;
    width: 0vw;
    height: 0vw;
    /* width: 20vw;
    height: 20vw; */
    /* min-height: 20vw; */
    border-radius: 50vw;
    background-color: #03A9F4;
    left: 70vw;
    top: 80vh;
    overflow: hidden;
    -webkit-transition: all 1s ease-in-out 0s;
    -moz-transition: all 1s ease-in-out 0s;
    -o-transition: all 1s ease-in-out 0s;
    transition: all 1s ease-in-out 0s;
}
.hello2{
  width: 100vw;
  height: 100vw;
  /* min-height: 100vh; */
  border-radius: 0vw;
  left: 0;
  top: 0;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
