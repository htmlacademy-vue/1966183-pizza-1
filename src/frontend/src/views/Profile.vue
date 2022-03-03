<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <img
          :src="userInfo.avatar"
          :srcset="userInfo.avatar"
          :alt="userInfo.name"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ userInfo.name }}</span>
      </div>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ userInfo.phone }}</span>
    </p>

    <profile-saved-address
      v-for="(savedAddress, index) in allAddresses"
      :key="savedAddress.id"
      :saved-address="savedAddress"
      @edit-address="editAddress($event, index)"
    />

    <profile-address-form
      @send-address="sendAddress"
      v-if="isAddressFormOpen"
      :form-data="formData"
      @delete-address="deleteAddress"
      :addrNumber="addrNumber"
      :total="totalSize"
    />

    <div class="layout__button" v-show="!isAddressFormOpen">
      <button @click.prevent="addNewAddress" class="button button--border">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileSavedAddress from "../modules/profile/ProfileSavedAddress";
import ProfileAddressForm from "../modules/profile/ProfileAddressForm";
import JwtService from "../services/jwt.service";

export default {
  name: "Profile",
  components: { ProfileSavedAddress, ProfileAddressForm },
  data() {
    return {
      isAddressFormOpen: false,
      formData: undefined,
      addrNumber: undefined,
      token: JwtService.getToken(),
    };
  },
  computed: {
    ...mapState("Auth", ["userInfo"]),
    ...mapState("Addresses", ["addresses"]),
    allAddresses() {
      return this.addresses.byId;
    },
    totalSize() {
      return this.addresses.allIds.length;
    },
  },
  methods: {
    addNewAddress() {
      this.isAddressFormOpen = true;
    },
    editAddress(id, addrNumber) {
      const data = this.allAddresses[id];
      this.formData = { ...data };
      this.isAddressFormOpen = true;
      this.addrNumber = Number(addrNumber);
    },
    deleteAddress(id) {
      this.$store.dispatch("Addresses/deleteAddress", {
        token: this.token,
        id,
      });
      this.isAddressFormOpen = false;
      this.formData = undefined;
      this.addrNumber = undefined;
    },
    sendAddress(data) {
      if (this.formData && this.token) {
        this.$store.dispatch("Addresses/changeAddress", {
          body: data,
          token: this.token,
        });
      } else {
        this.$store.dispatch("Addresses/createAddress", {
          body: { userId: this.userInfo.id, ...data },
          token: this.token,
        });
      }

      this.isAddressFormOpen = false;
      this.formData = undefined;
      this.addrNumber = undefined;
    },
  },
};
</script>

<style scoped lang="scss">
.user__phone {
  font-weight: bold;
}
</style>
