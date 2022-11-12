import { Rule } from "ant-design-vue/lib/form"
import {reactive, ref} from "vue";

export default function LoginMode() {

  const loginModel = reactive({
    account: "",
    apassword: "",
    verCode: "",
    uuid: ""
  });

  const rules= {
    account: [{ required: true, validator: account, trigger: 'change'}],
    apassword: [{ required: true, validator: apassword, trigger: 'change'}],
    verCode: [{ require: true, message: '请填写验证码', trigger: 'change'}],
    uuid: [{ require: true, message: '请填写验证码', trigger: 'change'}],
  }

  return {
    loginModel,
    rules
  }
}

  export const account = async (_rule: Rule, value: string) => {
    let pass = /(^[a-zA-Z0-9]{6,16}$)/
    if (value === '') {
      return Promise.reject('请输入你的密码')
    } else if (!pass.test(value)) {
      return Promise.reject('请输入6-12位密码')
    } else {
      return Promise.resolve()
    }
  }

  export const apassword = async (_rule: Rule, value: string) => {
      let pass = /(^[a-zA-Z0-9]{6,16}$)/
      if (value === '') {
        return Promise.reject('请输入你的密码')
      } else if (!pass.test(value)) {
        return Promise.reject('请输入6-12位密码')
      } else {
        return Promise.resolve()
      }
    }



