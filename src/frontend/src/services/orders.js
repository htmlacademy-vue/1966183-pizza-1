import ApiService from "./api";

async function getOrders(token) {
  return await ApiService.getRequest({
    address: `orders/`,
    token,
  });
}

async function createOrder(token, body) {
  return await ApiService.postRequest({
    address: `orders/`,
    token,
    body,
  });
}

async function createOrderWithoutAuth(body) {
  return await ApiService.postRequest({
    address: `orders/`,
    body,
  });
}

async function deleteOrder(token, id) {
  return await ApiService.deleteRequest({
    address: `orders/${id}`,
    token,
  });
}

export default {
  getOrders,
  createOrder,
  createOrderWithoutAuth,
  deleteOrder,
};
