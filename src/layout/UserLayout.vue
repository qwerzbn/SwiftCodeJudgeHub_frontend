<template>
  <div id="userLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="@/assets/oj.jpeg" alt="logo" />
          <div class="title">OJ 平台</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
#userLayout {
}

.logo {
  width: 100px;
  margin-right: 16px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  color: #1890ff;
}

#userLayout .header {
  margin-top: 24px;
  text-align: center;
  margin-bottom: 16px;
}

#userLayout .content {
  margin-bottom: 16px;
}
</style>
