import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import { login, getUserInfo, logout } from '@/api/user'
import { resetRouter } from '@/router/index'
import store from '@/store'

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []
  public email = ''

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  /**
   * 设置用户头像
   * @private
   * @param {string} avatar
   * @memberof User
   */
  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    let { username, password } = userInfo
    username = username.trim()
    const { data } = await login({ username, password })
    setToken(data.accessToken)
    this.SET_TOKEN(data.accessToken)
  }

  @Action
  public async Logout() {
    if (this.token === '') {
      throw Error('Logout: token is undefined!')
    }

    await logout()
    removeToken()
    resetRouter()
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }

    const { data } = await getUserInfo({})

    if (!data) {
      throw Error('Verification failed, please Login again.')
    }

    const { roles, name, avatar, introduction, email } = data.user

    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }

    this.SET_ROLES(roles)
    this.SET_NAME(name)
    this.SET_AVATAR(avatar)
    this.SET_INTRODUCTION(introduction)
    this.SET_EMAIL(email)
  }
}

export const UserModule = getModule(User)
