import ApiService from "./api";

async function getIngredients() {
  return ApiService.getRequest({
    address: `ingredients`,
  });
}
async function getSauces() {
  return ApiService.getRequest({
    address: `sauces`,
  });
}
async function getSizes() {
  return ApiService.getRequest({
    address: `sizes`,
  });
}
async function getDough() {
  return ApiService.getRequest({
    address: `dough`,
  });
}

export default {
  getIngredients,
  getSauces,
  getSizes,
  getDough,
};
