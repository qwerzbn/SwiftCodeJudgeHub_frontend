import router from "@/router";
import { useLoginUser } from "@/store/UserStore";
import AccessEnum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
//进入页面前进行权限校验
router.beforeEach(async (to, from, next) => {
  // 获取当前登录的用户信息
  const loginUserStore = useLoginUser();
  let loginUser = loginUserStore.loginUser;
  //如果之前没有尝试获取过登录用户信息，才自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 可以获取到用户的登录信息后再执行后续代码
    await loginUserStore.fetchLoginUser();
    // 刷新loginUser
    loginUser = loginUserStore.loginUser;
  }
  const userAccess = loginUser?.userRole ?? AccessEnum.NOT_LOGIN;
  const needAccess = (to?.meta?.access as string) ?? AccessEnum.NOT_LOGIN;
  // 如果当前页面必须要登录
  if (needAccess !== AccessEnum.NOT_LOGIN) {
    // 如果当前用户没有登录
    if (
      userAccess === AccessEnum.NOT_LOGIN ||
      !loginUser ||
      !loginUser?.userRole
    ) {
      next("/user/login?redirect=${to.fullPath}");
    }
    // 如果当前用户没有权限访问该页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
    }
  }
  next();
});
