<template>
  <!-- 如果meta有hidden就不用渲染 -->
  <div v-if="!route.meta || !route.meta.hidden">
    <!-- 如果没有children或只有一个children -->
    <template v-if="childrenNumber <=1">
      <el-menu-item :index="resolvePath(onlyOnechildrenRoute.path)">
        <svg-icon
          v-if="onlyOnechildrenRoute.meta && onlyOnechildrenRoute.meta.icon"
          :name="onlyOnechildrenRoute.meta.icon"
        ></svg-icon>
        <span
          v-if="onlyOnechildrenRoute.meta && onlyOnechildrenRoute.meta.title"
          slot="title"
        >{{$t('route.'+ onlyOnechildrenRoute.meta.title)}}</span>
      </el-menu-item>
    </template>
    <!-- 如果有children -->
    <el-submenu v-else :index="basePath">
      <template slot="title">
        <svg-icon v-if="route.meta && route.meta.icon" :name="route.meta.icon"></svg-icon>
        <span v-if="route.meta &&route.meta.title" slot="title">{{$t('route.'+ route.meta.title)}}</span>
      </template>
      <SidebarItem
        v-for="item in route.children"
        :route="item"
        :key="item.path"
        :base-path="resolvePath(item.path)"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'

@Component({
  name: 'SidebarItem',
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) private route!: RouteConfig
  @Prop({ default: '' }) private basePath!: string

  get childrenNumber() {
    if (this.route.children) {
      return this.route.children.length
    } else {
      return 0
    }
  }

  get onlyOnechildrenRoute() {
    if (this.childrenNumber === 1 && this.route.children) {
      return this.route.children[0]
    }
    return this.route
  }

  private resolvePath(routePath: string) {
    if (this.childrenNumber > 0) {
      return path.resolve(this.basePath, routePath)
    } else {
      return this.basePath
    }
  }
}
</script>

<style scoped>
</style>
