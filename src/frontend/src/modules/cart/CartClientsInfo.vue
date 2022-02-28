<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          :value="form.name"
          @change="changeAddress"
        >
          <option value="Заберу сам">Заберу сам</option>
          <option value="Новый адрес">Новый адрес</option>
          <option
            v-show="userInfoExisted"
            v-for="addr in addressesNames"
            :key="addr.id"
            :value="addr.id"
          >
            {{ addr.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          v-model="form.phone"
        />
      </label>

      <div class="cart-form__address" v-if="form.name !== 'Заберу сам'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="street" v-model="form.street" />
          </label>
          <span v-show="isStreetEmpty" class="validation"
            >Это поле обязательно</span
          >
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="house" v-model="form.building" />
          </label>
          <span v-show="isBuildingEmpty" class="validation"
            >Это поле обязательно</span
          >
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="apartment" v-model="form.flat" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "CartClientsInfo",
  props: {
    infoForm: {
      type: Object,
      required: true,
    },
    isStreetEmptyProp: {
      type: Boolean,
      default: false,
    },
    isBuildingEmptyProp: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        street: "",
        building: "",
        flat: "",
        phone: "",
        name: "Новый адрес",
      },
      isStreetEmpty: false,
      isBuildingEmpty: false,
    };
  },
  mounted() {
    this.form = { ...this.infoForm };
  },
  watch: {
    isStreetEmptyProp() {
      this.isStreetEmpty = this.isStreetEmptyProp;
    },
    isBuildingEmptyProp() {
      this.isBuildingEmpty = this.isBuildingEmptyProp;
    },
    infoForm: {
      deep: true,
      handler() {
        if (JSON.stringify(this.form) !== JSON.stringify(this.infoForm)) {
          this.form = { ...this.infoForm };
        }
      },
    },
    form: {
      deep: true,
      handler(val) {
        this.$emit("update:infoForm", val);
      },
    },
  },
  methods: {
    changeAddress(event) {
      if (event.currentTarget.value === "Новый адрес") {
        this.form = {
          street: "",
          building: "",
          flat: "",
          name: "Новый адрес",
        };
      }
      if (event.currentTarget.value === "Заберу сам") {
        this.form = {
          street: "",
          building: "",
          flat: "",
          name: "Заберу сам",
        };
      }
      const data = this.addressesValues[event.currentTarget.value];
      if (data) {
        this.form = {
          street: data.street,
          building: data.building,
          flat: data.flat,
          name: data.id,
        };
      }
    },
  },
  computed: {
    ...mapGetters("Auth", ["userInfoExisted"]),
    ...mapState("Addresses", ["addresses"]),
    addressesNames() {
      if (this.addressesValues) {
        return Object.values(this.addressesValues).map((addr) => {
          return { name: addr.name, id: addr.id };
        });
      }
      return [];
    },
    addressesValues() {
      return this.addresses.byId;
    },
  },
};
</script>

<style scoped lang="scss">
.validation {
  font-size: 10px;
  color: red;
  position: absolute;
}
</style>
