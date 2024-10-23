import { defineStore } from "pinia";
import { ref } from "vue";
import { LoginUserVO } from "../../generated/models/LoginUserVO";
import AccessEnum from "@/access/accessEnum";
import { UserControllerService } from "../../generated/services/UserControllerService";

export const useLoginUser = defineStore("loginUser", () => {
  const loginUser = ref<LoginUserVO>({
    userName: "未登录",
  });

  // 设置登录信息
  function setLoginUser(newLoginUser: LoginUserVO) {
    loginUser.value = newLoginUser;
  }

  async function fetchLoginUser() {
    // TODO: 获取登录用户信息
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code === 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      loginUser.value = res.data;
    } else {
      loginUser.value = { userRole: AccessEnum.NOT_LOGIN };
    }
  }

  return { loginUser, setLoginUser, fetchLoginUser };
});
