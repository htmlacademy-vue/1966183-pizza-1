import ApiService from "./api";

async function getMisc() {
  return ApiService.getRequest({
    address: `misc`,
  });
}

export default {
  getMisc,
};
