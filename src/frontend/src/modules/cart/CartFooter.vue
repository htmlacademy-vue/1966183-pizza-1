<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow"
        >Хочу еще одну</router-link
      >
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ finalPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <button type="submit" class="button" @click.prevent="$emit('show-popup')">
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "CartFooter",
  props: {
    finalPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
