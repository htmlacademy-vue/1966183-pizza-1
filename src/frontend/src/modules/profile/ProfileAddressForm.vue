<template>
  <div class="layout__address">
    <div class="address-form__header">
      <b>{{ formHeader }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            v-model="form.name"
          />
        </label>
        <span v-show="isNameEmpty" class="validation"
          >Это поле обязательно</span
        >
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            v-model="form.street"
          />
        </label>
        <span v-show="isStreetEmpty" class="validation"
          >Это поле обязательно</span
        >
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            required
            v-model="form.building"
          />
        </label>
        <span v-show="isBuildingEmpty" class="validation"
          >Это поле обязательно</span
        >
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
            v-model="form.flat"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
            v-model="form.comment"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        @click="deleteAddress"
        class="button button--transparent"
        v-if="!!formData"
      >
        Удалить
      </button>
      <button class="button" @click="sendAddress">Сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileAddressForm",
  props: {
    formData: {
      type: Object,
      required: undefined,
    },
    addrNumber: {
      type: Number,
      default: undefined,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      form: { name: "", street: "", building: "", flat: "", comment: "" },
      isNameEmpty: false,
      isStreetEmpty: false,
      isBuildingEmpty: false,
    };
  },
  mounted() {
    if (this.formData) {
      this.form = { ...this.formData };
    }
  },
  watch: {
    formData(val) {
      this.form = { ...val };
    },
  },
  computed: {
    formHeader() {
      return this.addrNumber
        ? `Адрес №${this.addrNumber}`
        : `Адрес №${this.total + 1}`;
    },
  },
  methods: {
    sendAddress() {
      if (!!this.form.name && !!this.form.street && !!this.form.building) {
        this.$emit("send-address", this.form);
        return;
      }
      this.isNameEmpty = !this.form.name;
      this.isStreetEmpty = !this.form.street;
      this.isBuildingEmpty = !this.form.building;
    },
    deleteAddress() {
      this.$emit("delete-address", this.form.id);
    },
  },
};
</script>

<style scoped lang="scss">
.validation {
  font-size: 10px;
  color: red;
}
</style>
