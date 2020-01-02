<template>
  <div>
    <el-menu :default-active="activeMenu" :collapse="isCollapse" router>
      <SiderbarItem v-for="item in routes" :route="item" :key="item.path" :base-path="item.path" />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PermissionModule } from '@/store/modules/permission'
import SiderbarItem from './SidebarItem.vue'
import { RouteConfig } from 'vue-router'

@Component({
  components: {
    SiderbarItem
  }
})
export default class extends Vue {
  private isCollapse: boolean = false

  get routes() {
    return this.filterShowRoutes(PermissionModule.routes)
  }

  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }

  // 过滤出需要显示的路由
  private filterShowRoutes(routes: RouteConfig[]) {
    const showRoutes: RouteConfig[] = []
    routes.forEach(route => {
      if (!(route.meta && route.meta.hidden)) {
        if (route.children) {
          route.children = this.filterShowRoutes(route.children)
        }
        showRoutes.push(route)
      }
    })
    return showRoutes
  }

  // private handleSelect(key: string, keyPath: string[]) {
  //   console.log(key, keyPath)
  // }
}
</script>

<style scoped>
</style>
