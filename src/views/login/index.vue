<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          autocomplete="on"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          :placeholder="$t('login.password')"
          name="password"
          :type="passwordType"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />
        <span
          v-if="loginForm.password"
          class="svg-container show-pwd"
          @mousedown="passwordType = 'text'"
          @mouseup="passwordType = 'password'"
          @mouseleave="passwordType = 'password'"
        >
          <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>
      <el-button
        class="submitBtn"
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
      >{{$t('login.logIn')}}</el-button>
    </el-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'
import { isValidUsername } from '@/utils/validate'
import { UserModule } from '@/store/modules/user'
import { Route } from 'vue-router'
import { Form as ElForm, Input } from 'element-ui'
import { Dictionary } from 'vuex'

@Component({
  name: 'Login',
  components: {}
})
export default class extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidUsername(value)) {
      callback(new Error('请输入正确的用户名'))
    } else {
      callback()
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('密码必须大于6位'))
    } else {
      callback()
    }
  }
  private loginForm = {
    username: 'admin',
    password: ''
  }

  private loginRules = {
    username: [{ require: true, trigger: 'blur', validator: this.validateUsername }],
    password: [{ require: true, trigger: 'blur', validator: this.validatePassword }]
  }

  private passwordType = 'password'
  private loading = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  mounted() {
    if (this.loginForm.username === '') {
      ;(this.$refs.username as Input).focus()
    } else if (this.loginForm.password === '') {
      ;(this.$refs.password as Input).focus()
    }
  }
  private handleLogin() {
    ;(this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true
        await UserModule.Login(this.loginForm)
        console.log(this.redirect, this.otherQuery)
        this.$router.push({
          path: this.redirect || '/',
          query: this.otherQuery
        })
      } else {
        return false
      }
    })
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce(
      (acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      },
      {} as Dictionary<string>
    )
  }
}
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  justify-content: center;
  .show-pwd {
    cursor: pointer;
  }
  .svg-container {
    padding: 0 10px;
    color: $dark_gray;
    vertical-align: middle;
    display: flex;
    align-items: center;
  }
  .login-form {
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    overflow: hidden;
    line-height: 36px;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  &::v-deep .el-form-item {
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 22px;
    padding: 0 5px;
  }
  &::v-deep .el-form-item__content {
    display: flex;
    align-content: center;
    .el-input {
      flex: 1;
    }
    input {
      width: 100%;
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px;
      color: $light_gray;
      height: 47px;
      caret-color: #fff;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #283443 inset !important;
        box-shadow: inset 0 0 0 1000px #283443 !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .submitBtn {
    width: 100%;
  }
}
</style>
