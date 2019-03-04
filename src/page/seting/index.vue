<template>
  <div class="seting-page">
    <top>
      <slot>设置</slot>
    </top>
    <div class="seting-list">
      <div class="seting-item" @click="modelShow = true">
        <p>皮肤</p>
        <p>{{skinName}}</p>
      </div>
    </div>
    <div class="modal" v-if="modelShow">
      <div>
        <p v-for="item in skinList" @click="setSkin(item)" :key="item.value">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Top from "components/top-return";
export default {
  name: "seting",
  data() {
    return {
      skinName: "",
      modelShow: false,
      skinList: [
        {
          name: "森林绿",
          value: "#002521",
          class: 'forest'
        },
        {
          name: "少女粉",
          value: "#ffb6ca",
          class: 'pink'
        },
        {
          name: "樱草黄",
          value: "#ffbc4f",
          class: 'yello'
        },
        {
          name: "天空蓝",
          value: "#96c2fc",
          class: 'skyblue'
        },
        {
          name: "深湖蓝",
          value: "#000c47",
          class: 'blue'
        },
        {
          name: "石榴红",
          value: "#991209",
          class: 'red'
        },
        {
          name: "鳝鱼青",
          value: "#bdc6ac",
          class: 'fish'
        },
        {
          name: "水泥灰",
          value: "#bbd0d8",
          class: 'grey'
        },
        {
          name: "古铜黑",
          value: "#000108",
          class: 'black'
        }
      ]
    };
  },
  components: {
    Top
  },
  created: {},
  methods: {
    setSkin(data) {
      window.localStorage.setItem("skin", data.value);
      window.localStorage.setItem('active', data.class)
      window.history.go(0);
    }
  }
};
</script>
<style lang="stylus">
.seting-page {
  background: #fafafa;
  width: 100%;
  height: 100vh;
}

.seting-item {
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 0.5rem;

  p {
    margin: 0.6rem 0.5rem;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  div {
    background: #fff;
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 0.2rem;
    box-sizing: border-box;

    p {
      margin: 0.5rem 0;
      padding: 0 0.5rem;
    }
  }
}
</style>
