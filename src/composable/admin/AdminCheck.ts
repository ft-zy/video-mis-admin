import { AdminMode } from "@/api/admin/AdminType";
import { Rule } from "ant-design-vue/lib/form";
import { reactive, ref } from "vue";
export default function AdminCheck() {    
    const addModel = reactive<AdminMode>({
        aid: '',
        roid: [],
        account: '',
        apassword: '',
        aemail: '',
        aphone: '',
        aportrait: '',
        admin: '',
        asex: '',
        aname:'',
        type: '',
      })

      const rules= {
        aname: [{ required: true, validator: aName, trigger: 'change'}],
        account: [{ required: true, validator: Account, trigger: 'change' }],
        password: [{ required: true, validator: aPassword, trigger: 'change' }],
        aphone: [{ required: true, validator: aPhone, trigger: 'change' }],
        aemail: [{ required: true, validator: aEmail, trigger: 'change' }],
        asex: [{ required: true, validator: aSex, trigger: 'change' }],
        roid: [{ required: true, message: "请选择角色", trigger: 'change' }]
      }

      return {
        addModel,
        rules
      }
}

export async function aName(_rule: Rule, value: string) {
  let pass = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
    if (!pass.test(value)) {
        return Promise.reject('请输入1-10位的用户名！');
    } 
}

export async function Account(_rule: Rule, value: string) {
    let pass = /(^[a-zA-Z0-9]{1,16}$)/;
    if (!pass.test(value)) {
      return Promise.reject('请输入6-16位的账号！');
    } 
  }

  export async function aPassword(_rule: Rule, value: string) {
    let pass = /(^[a-zA-Z0-9]{1,100}$)/;
    if (!pass.test(value)) {
      return Promise.reject('请输入密码长度大于6位的密码！');
    } 
  }

  export async function aPhone(_rule: Rule, value: string) {
    let pass = /(^[a-zA-Z0-9]{1,16}$)/;
    // let pass = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
    if (!pass.test(value)) {
      return Promise.reject('请输入有效的手机号码！');
    } 
  }

  export async function aEmail(_rule: Rule, value: string) {
    let pass = /(^[a-zA-Z0-9]{1,16}$)/;
    // let pass = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pass.test(value)) {
      return Promise.reject('请输入有效的的邮箱！');
    }
  }

  export async function aSex(_rule: Rule, value: string) {
    if (value === '') {
      return Promise.reject('请选择性别！');
    } 
  }


