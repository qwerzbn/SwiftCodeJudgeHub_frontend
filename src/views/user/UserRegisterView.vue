<template>
  <div id="userLogin">
    <div class="title">
      <h2>用户注册</h2>
    </div>
    <a-form
      :model="form"
      @submit="handleSubmit"
      label-align="left"
      style="max-width: 480px; margin: 0 auto"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        field="userPassword"
        tooltip="密码长度不小于8位"
        label="密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="checkPassword"
        tooltip="密码长度不小于8位"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"
          >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService } from "../../../generated";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";

const route = useRouter();
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    message.success("注册成功");
    await route.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败");
  }
};
</script>
<style scoped>
#userLogin {
}

.title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
