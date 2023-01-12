<template>
  <div class="register">
    <b-row class="mt-5">
      <b-col md="8" offset-md="2" lg="6" offset-lg="3">
        <b-card title="注册">
          <b-form>
            <b-form-group id="input-group-1" label="名称" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="$v.user.name.$model"
                type="text"
                placeholder="请输入您的名称（选填）"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="手机号码" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="$v.user.telephone.$model"
                type="tel"
                required
                placeholder="请输入您的手机号码"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('telephone')">
                请输入正确的手机号码
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="input-group-3" label="密码" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="$v.user.password.$model"
                type="password"
                required
                placeholder="请输入您的密码"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码应不少于6个字符
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <b-button variant="outline-primary" block @click="register">注册</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import customValidator from '@/helper/validator'

export default {
  name: 'Register',
  data() {
    return {
      user: {
        name: '',
        telephone: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions('userModule', { userRegister: 'register' }),
    register() {
      // 验证数据
      this.$v.user.$touch()
      if (this.$v.user.$anyError) {
        return
      }
      // 请求api
      this.userRegister(this.user)
        .then(() => {
          // 跳转主页
          this.$router.replace({ name: 'Home' })
        })
        .catch((err) => {
          this.$bvToast.toast(err.response.data.msg, {
            title: '数据验证错误',
            variant: 'danger',
            solid: true,
          })
        })
      console.log('register')
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.user[name]
      return $dirty ? !$error : null
    },
  },
  validations: {
    user: {
      name: {},
      telephone: {
        required,
        telephone: customValidator.telephoneValidator,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
}
</script>

<style scoped></style>
