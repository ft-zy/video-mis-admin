<template>
  <div class="from">
    <p style="font-size: 25px; color: black">ZY视频后台管理系统</p>
    <a-form >
      <a-form-item v-bind="validateInfos.account">
        <a-input 
          v-model:value="loginModel.account" 
          placeholder="请输入账户"
          size="large"
          >
          <template #prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="validateInfos.apassword">
        <a-input
          v-model:value="loginModel.apassword"
          type="password"
          placeholder="请输入密码"
          size="large"
        >
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="validateInfos.verCode" >
            <a-input
              v-model:value="loginModel.verCode"
              placeholder="请输入验证码"
              style="width: 260px; margin-right: 5px"
              autocomplete="off"
              size="large"
            >
            <template #prefix>
              <verified-outlined  style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
            <img
              style="width:130px; height:39px; margin-bottom: 7px;"
              :src="captcha.list"
              preview="true"
              @click="getCaptcha1"
            />
          </a-form-item>
      <input type="hidden" :value="loginModel.uuid = verKey.list">
      <a-form-item :wrapper-col="{ offset: 4, span: 18 }">
        <a-row>
          <a-col>
            <a-button type="primary" @click="loginBtn" style="width: 120px"
              >登 录</a-button
            >
          </a-col>
          <a-col>
            <a-button
              type="primary"
              @click="resetBtn"
              style="margin-left: 15px; width: 120px"
              >重 置</a-button
            >
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang='ts'>
// import { LoginApi } from "@/api/login/Login";
// import LoginCheck, {account} from "@/composable/login/LoginCheck";
// import VerfiyCode from "@/composable/login/VerfiyCode";
// import {getAid, setAid, setToken} from "@/utils/auth";
// import { message } from "ant-design-vue";
// // import { Rule, useForm } from "ant-design-vue/lib/form";
// import { useRouter } from "vue-router";
// import {captcha1Api} from "@/api/login/Verify";
// import {reactive, ref} from "vue";
// import {getByIdApi} from "@/api/admin/Admin";
import AdminLogin from "@/composable/login/AdminLogin";
const { validateInfos, loginModel, loginBtn, resetBtn,verKey, captcha, getCaptcha1 } = AdminLogin()

</script>