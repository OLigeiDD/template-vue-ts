<template>
  <div>
    <el-menu
      default-active="/"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      router
    >
      <SiderbarItem />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PermissionModule } from '../../../store/modules/permission'
import SiderbarItem from './SidebarItem.vue'

@Component({
  components: {
    SiderbarItem
  }
})
export default class extends Vue {
  private isCollapse: boolean = false
  private handleOpen(key: string, keyPath: string[]) {
    console.log(key, keyPath)
  }
  private handleClose(key: string, keyPath: string[]) {
    console.log(key, keyPath)
  }

  get routes() {
    return PermissionModule.routes
  }

  mounted() {
    console.log(PermissionModule.routes)
  }
}
</script>

<style scoped>
</style>
