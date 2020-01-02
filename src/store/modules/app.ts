import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import {
  getSidebarStatus,
  getSize,
  setSidebarStatus,
  setLanguage,
  setSize
} from '@/utils/cookies'
import store from '@/store'
import { getLocale } from '@/lang'

export enum DeviceType {
  Mobile,
  Desktop
}

export interface IAppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
  size: string
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public device = DeviceType.Desktop
  public sidebar = {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  }
  public language = getLocale()
  public size = getSize() || 'medium'
}

export const AppModule = getModule(App)
