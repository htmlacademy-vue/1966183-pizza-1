<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b> {{ savedAddress.name }} </b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click.prevent="editAddress">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ addressText }}</p>
      <small>{{ savedAddress.comment }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileSavedAddress",
  props: {
    savedAddress: {
      type: Object,
      required: true,
    },
  },
  computed: {
    addressText() {
      const flat = this.savedAddress.flat
        ? `, кв.${this.savedAddress.flat}`
        : "";
      return `${this.savedAddress.street}, д.${this.savedAddress.building} ${flat}`;
    },
  },
  methods: {
    editAddress() {
      this.$emit("edit-address", this.savedAddress.id);
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  cursor: pointer;
}
</style>
