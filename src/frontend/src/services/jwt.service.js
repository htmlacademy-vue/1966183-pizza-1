const saveToken = (token) => {
  window.localStorage.setItem("token", token);
};

const getToken = () => {
  return window.localStorage.getItem("token");
};

const destroyToken = () => {
  window.localStorage.removeItem("token");
};

export default {
  saveToken,
  destroyToken,
  getToken,
};
