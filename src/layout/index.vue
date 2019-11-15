<template>
  <div class="app-wrapper">
    <Sidebar class="app-sidebar"></Sidebar>
    <div class="app-main">
      <Navbar class="app-navbar" />
      <MainContent class="app-maincontent" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppMain from './components/AppMain.vue'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import MainContent from './components/Maincontent/index.vue'
@Component({
  name: 'Layout',
  components: {
    MainContent,
    Sidebar,
    Navbar
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.app-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  background-color: pink;
}
.app-main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 200px;
}
.app-navbar {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 80px;
}
.app-maincontent {
  padding-top: 80px;
}
</style>
