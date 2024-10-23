<template>
  <div class="globalHeader">
    <a-row class="grid-demo" style="margin-bottom: 16px" align="center">
      <a-col flex="auto">
        <div>
          <a-menu
            mode="horizontal"
            :selected-keys="selectedKeys"
            @menu-item-click="doMenuClick"
          >
            <a-menu-item
              key="0"
              :style="{ padding: 0, marginRight: '38px' }"
              disabled
            >
              <div class="title_bar">
                <img class="logo" src="@/assets/oj.jpeg" alt="logo" />
                <div class="title">OJ 平台</div>
              </div>
            </a-menu-item>
            <a-menu-item v-for="item in visibleRoute" v-bind:key="item.path">
              {{ item.name }}
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
      <a-col flex="100px">
        <div v-if="loginUser.loginUser.id">
          {{ loginUser.loginUser.userName ?? "匿名用户" }}
        </div>
        <div v-else>
          <a-button type="primary" href="/user/login">登录</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<style scoped>
.globalHeader {
}

.title_bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 48px;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useLoginUser } from "@/store/UserStore";
import checkAccess from "@/access/checkAccess";

const router = useRouter();
const selectedKeys = ref(["/"]);
const loginUser = useLoginUser();
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
// 在computed中有值发生了变化，就会重新计算，从而重新渲染页面
const visibleRoute = computed(() =>
  routes.filter((item) => {
    // 过滤隐藏菜单栏
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单栏
    if (!checkAccess(loginUser.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  })
);
</script>
