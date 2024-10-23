import AccessEnum from "@/access/accessEnum";
import { LoginUserVO } from "../../generated";

/**
 * 检查用户权限
 * @param loginUser
 * @param needAccessUser
 */
const checkAccess = (
  loginUser: LoginUserVO,
  needAccessUser = AccessEnum.NOT_LOGIN
) => {
  const loginUserAccess = loginUser?.userRole ?? AccessEnum.NOT_LOGIN;
  if (needAccessUser === AccessEnum.NOT_LOGIN) {
    return true;
  }
  if (needAccessUser === AccessEnum.USER) {
    if (loginUserAccess === AccessEnum.NOT_LOGIN) {
      return false;
    }
  }
  if (needAccessUser === AccessEnum.ADMIN) {
    if (loginUserAccess !== AccessEnum.ADMIN) {
      return false;
    }
  }
  return true;
};
export default checkAccess;
