import ApiService from "./api";

async function getAddresses(token) {
  return await ApiService.getRequest({
    address: `addresses/`,
    token,
  });
}

async function createAddress(token, body) {
  return await ApiService.postRequest({
    address: `addresses/`,
    token,
    body,
  });
}

async function changeAddress(token, body) {
  return await ApiService.putRequest({
    address: `addresses/${body.id}`,
    token,
    body,
  });
}

async function deleteAddress(token, id) {
  return await ApiService.deleteRequest({
    address: `addresses/${id}`,
    token,
  });
}

export default {
  getAddresses,
  createAddress,
  changeAddress,
  deleteAddress,
};
