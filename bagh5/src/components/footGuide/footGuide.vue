<template>
  <nav class="mui-bar mui-bar-tab">
    <a class="mui-tab-item mui-active" @tap = "gotoAddress('home')">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">首页</span>
    </a>
    <a class="mui-tab-item" @tap = "gotoAddress('mycenter')">
      <span class="mui-icon mui-icon-person"></span>
      <span class="mui-tab-label">我的</span>
    </a>
  </nav>
</template>

<script>
export default {
  name: 'footGuide',
  methods: {
    gotoAddress (path) {
      console.log(path)
    }
  }
}
</script>
