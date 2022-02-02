<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          @change="
            $emit('changeDelivery', {
              value: $event.target.value,
              type: 'delivery',
            })
          "
          :value="clientsInfo.delivery"
        >
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3">Дом</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          @change="
            $emit('changePhone', {
              value: $event.target.value,
              type: 'phone',
            })
          "
          :value="clientsInfo.phone"
        />
      </label>

      <div class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              @change="
                $emit('changeStreet', {
                  value: $event.target.value,
                  type: 'street',
                })
              "
              :value="clientsInfo.street"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              @change="
                $emit('changeHouse', {
                  value: $event.target.value,
                  type: 'house',
                })
              "
              :value="clientsInfo.house"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              @change="
                $emit('changeFlat', {
                  value: $event.target.value,
                  type: 'flat',
                })
              "
              :value="clientsInfo['flat']"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartClientsInfo",
  props: {
    clientsInfo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
