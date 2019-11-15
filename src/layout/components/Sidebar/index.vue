<template>
  <e>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <!-- <template v-for="route in routes">
          <template>
            <el-submenu>

            </el-submenu>
          </template>
      </template> -->

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PermissionModule } from '../../../store/modules/permission'

@Component({})
export default class extends Vue {
  private isCollapse: boolean = false
  private handleOpen(key: string, keyPath: string[]) {
    console.log(key, keyPath)
  }
  private handleClose(key: string, keyPath: string[]) {
    console.log(key, keyPath)
  }

  get routes () {
    return PermissionModule.routes
  }

  mounted() {
    console.log(PermissionModule.routes)
  }
}
</script>

<style scoped>
</style>
