<template>
  <div>
    <router-view></router-view>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from './components/footGuide/footGuide'
export default {
  name: 'footguide',
  components: { footGuide }
}
</script>

<style lang="scss">
  @import '../static/mui/css/mui.css';
  @import 'src/style/common';
</style>
