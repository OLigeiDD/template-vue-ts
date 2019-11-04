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
          <svg-icon icon-class="user" prefix="icon" />
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          autocomplete="on"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" prefix="icon" />
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="密码"
          name="password"
          :type="passwordType"
          tabindex="2"
        />
        <span
          v-if="showeye"
          class="svg-container show-pwd"
          @mousedown="passwordType = 'text'"
          @mouseup="passwordType = 'password'"
          @mouseleave="passwordType = 'password'"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" prefix="icon" />
        </span>
      </el-form-item>

      <el-button class="submitBtn" :loading="loading" type="primary" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component({
  name: 'Login',
  components: {}
})
export default class extends Vue {}
</script>
<script>
import { isValidUsername } from '@/utils/validate'
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isValidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码必须大于6位'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ require: true, trigger: 'blur', validator: validateUsername }],
        password: [{ require: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false
    }
  },
  components: {},
  computed: {
    showeye() {
      return Boolean(this.loginForm.password)
    }
  },
  methods: {
    switchPasswordvisualStatus() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          console.log('登陆中')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
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
