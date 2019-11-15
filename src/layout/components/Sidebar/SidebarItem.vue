<template>
  <div>
    <!-- 如果有children -->
    <template v-if="true">
      <el-submenu :key="route.path"></el-submenu>
    </template>
    <!-- 如果没有children -->
    <template>
      <el-menu-item index="route.path" :key="route.path"></el-menu-item>
    </template>

    <!-- <el-submenu>
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="/">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="/table">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>-->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class extends Vue {}
</script>

<style scoped>
</style>
