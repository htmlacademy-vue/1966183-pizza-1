import ApiService from "./api";
import JwtService from "./jwt.service";

async function login(body) {
  const res = await ApiService.postRequest({
    address: `login`,
    body,
  });
  if (res) {
    JwtService.saveToken(res.token);
    return res;
  }
}

async function logout(token) {
  const res = await ApiService.deleteRequest({
    address: `logout/`,
    token,
  });
  if (res) {
    JwtService.destroyToken();
    return true;
  }
}

async function whoAmI(token) {
  return await ApiService.getRequest({
    address: `whoAmI/`,
    token,
  });
}

export default {
  login,
  logout,
  whoAmI,
};
