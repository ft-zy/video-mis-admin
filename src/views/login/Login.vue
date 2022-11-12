<template>
  <div class="setting">
    <div class="login">
      <div class="left"></div>
      <div class="right">
        <LoginForm></LoginForm>
      </div>
    </div>
  </div>
</template>
    
<script setup lang='ts'>
import LoginForm from "./LoginForm.vue";
</script>
    
<style lang="scss" scoped>
.setting {
  position: fixed;
  width: 100%;
  height: 100%;
//   background-color: whitesmoke;
background-image: url(https://oss.dev33.cn/sa-token/home-bg.jpg);
animation: changes 60s 0.3s linear infinite normal;
//   background: linear-gradient(100deg, #a29bfe, #d990aa);
@keyframes changes {
	from {background-position: 0vw 0%;}
	to {background-position: -20vw 0%;}
}
}
.login {
  border: 1px solid black;
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 46%;
  margin-left: -350px;
  margin-top: -250px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: rgba(216, 197, 197, 0.19) 0px 6px 15px 0px;
  -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
  border-radius: 12px;
  -webkit-border-radius: 12px;
  color: rgba(255, 255, 255, 0.75);
}
.left {
  width: 250px;
  height: 500px;
  background-size: cover;
  background-image: url(https://oss.dev33.cn/sa-token/home-bg.jpg);
animation: changes 60s 0.2s linear infinite normal;
//   background: linear-gradient(100deg, #a29bfe, #d990aa);
@keyframes changes {
	from {background-position: 0vw 0%;}
	to {background-position: -20vw 0%;}
}
}
.right {
  width: 400px;
  height: 300px;
  // border: 1px solid black;
  margin: auto;
  text-align: center;
}
</style>