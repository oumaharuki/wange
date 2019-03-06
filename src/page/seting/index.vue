<template>
  <div class="seting-page">
    <top>
      <slot>设置</slot>
    </top>
    <div class="seting-list">
      <div class="seting-item" @click="skinShow">
        <p>皮肤</p>
        <p class="itemName">{{skinName}}</p>
      </div>
      <div class="seting-item" @click="setReady">
        <p>阅读兴趣</p>
        <p class="itemName">{{interestReady}}</p>
      </div>
      <div class="seting-item" @click="clearStorage">
        <p>清除所有缓存</p>
      </div>
    </div>
    <div class="modal" v-if="modelShow" @click='modelShow=false'>
      <div>
        <p v-for="item in modal" @click="setSkin(item)" :key="item.value">{{item.name}}</p>
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
      interestReady: '',
      modal: [],
      gender: [{
        name: '男',
        value: 'male',
        class: ''
      }, {
        name: '女',
        value: 'female',
        class: ''
      }],
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
  created() {
    const user = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
    this.skinName = user.skinName || '默认'
    this.interestReady = user.gender === 'male' ? '男' : (user.gender === 'female' ? '女' : '默认')
  },
  methods: {
    setSkin(data) {
      let user = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
      if (data.class) {
        user.skin = data.value
        user.active = data.class
        user.skinName = data.name
      } else {
        user.gender = data.value
      }
      window.localStorage.setItem('userInfo', JSON.stringify(user))
      window.history.go(0);
    },
    skinShow() {
      this.modelShow = true
      this.modal = this.skinList
    },
    setReady() {
      this.modelShow = true
      this.modal = this.gender
    },
    clearStorage() {
      window.localStorage.clear()
      window.sessionStorage.clear()
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
    font-size .8rem;
    font-weight bolder;
  }
}
.itemName{
  color #9b9b9b;
  font-size .6rem !important;
  font-weight normal !important;
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
