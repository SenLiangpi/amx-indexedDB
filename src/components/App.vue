<!--
 * @Descripttion: 
 * @version: 
 * @Author: guanxiaoxin
 * @Date: 2020-10-14 10:49:53
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-11-02 17:07:33
 * @FilePath: /xieXiaoQin/src/App.vue
-->
<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    111
    <div data-tname="WaveItem">
      <div class="main-container">
        <div class="waves">
          <div
            class="wave"
            v-for="(item, key) in waves"
            :key="key"
            :style="item"
          >
            <div
              v-for="n in wavesConfig.total"
              :key="n"
              class="wave-item"
              :style="{
                transform: `scale(${0.1 * Math.sqrt(n - 1)})`, // 使得波纹大小指数增长
                opacity: 0.3 * (1 / n), // 因为相互层叠的波纹透明度会相互叠加，需要越小的波纹透明度越低，以免中心颜色过重
                animationDelay: `${(n - 1) * 0.12}s`, // 越大的波纹越晚出现，以呈现波纹逐渐扩散的效果
                animationDuration: `${
                  0.6 + n * 0.3 + parseInt(item.width) * 0.002
                }s`, // 波纹动画时间渐增，表现波纹向外扩散渐慢的效果,波纹尺寸越大动画时间越长。
                backgroundColor: wavesConfig.waveColor,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
   
  </div>
</template>

<script>
// import { APP_DEVICE } from "./store/mutation-type";
// import { deviceEnquire } from "./util/device";
// import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  mounted() {
    // deviceEnquire((deviceType) => {
    //   this.$store.commit(APP_DEVICE, deviceType);
    // });
    document.getElementById("app").onclick = (e) => {
      this.createWave(e);
      this.intervalClearWave();
    };
  },
  computed: {
    // ...mapGetters(['device'])
    // ...mapGetters({
    //   device: "device",
    // }),
  },
  data() {
    return {
      waves: [],
      wavesConfig: {
        maxSize: 300, // px，波纹最大尺寸
        minSize: 100, // px，波纹最小尺寸
        zIndexCount: 999, // 波纹父元素其z-index数值
        waveColor: "#3E8CE3", //波纹基础颜色
        total: 5, //波纹圈层数
      },
      clear: {
        delay: 5000,
        timeoutId: null,
      },
    };
  },

  methods: {
    createWave(e) {
      // 让新生成的波纹始终在之前波纹的上层产生叠加效果
      if (this.wavesConfig.zIndexCount > 99999) {
        this.wavesConfig.zIndexCount = 999;
      } else {
        this.wavesConfig.zIndexCount++;
      }
      // 在一定范围内随机生成波纹的大小
      const waveSize = parseInt(
        Math.random() * (this.wavesConfig.maxSize - this.wavesConfig.minSize) +
          this.wavesConfig.minSize
      );
      //添加新的波纹数据
      this.waves.push({
        left: `${e.clientX - waveSize / 2}px`,
        top: `${e.clientY - waveSize / 2}px`,
        zIndex: this.wavesConfig.zIndexCount,
        width: `${waveSize}px`,
        height: `${waveSize}px`,
      });
    },
    intervalClearWave() {
      clearTimeout(this.clear.timeoutId);
      this.clear.timeoutId = setTimeout(() => {
        this.waves = [];
      }, this.clear.delay);
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: tahoma, arial, "Hiragino Sans GB", "\5b8b\4f53", sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 16px;
  color: #f5f5dc;
  /* cursor: url(http://mly-zju.github.io/favicon.ico), auto; */
  /* color: #2c3e50; */

  /* margin-top: 60px; */
}
#Snow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(225, 225, 225, 0.1);
  pointer-events: none;
}
.waves .wave {
  position: fixed;
  pointer-events: none;
}
@keyframes wave {
  to {
    transform: scale(1);
    opacity: 0;
  }
}
.waves .wave .wave-item {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 100%;
  animation: {
    name: wave;
    fill-mode: forwards;
    timing-function: ease-out;
  }
}
</style>
