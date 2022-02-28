<template>
  <div class="sign-form">
    <a href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form>
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            required
            type="email"
            name="email"
            placeholder="example@mail.ru"
            v-model="email"
          />
          <span class="warning" v-show="isEmailError">
            Поле не может быть пустым или введено некорректно
          </span>
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            required
            type="password"
            name="pass"
            placeholder="***********"
            v-model="password"
          />
          <span class="warning" v-show="isPasswordError">
            Поле не может быть пустым
          </span>
        </label>
      </div>
      <button class="button" @click.prevent="login({ email, password })">
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      isEmailError: false,
      isPasswordError: false,
      emailRegExp: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    };
  },
  methods: {
    async login(payload) {
      this.isEmailError = false;
      this.isPasswordError = false;
      if (this.email === "" || !this.emailRegExp.test(this.email)) {
        this.isEmailError = true;
        return;
      }
      if (this.password === "") {
        this.isPasswordError = true;
        return;
      }
      const response = await this.$store.dispatch("Auth/login", payload);
      if (response) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.warning {
  color: red;
  font-size: 10px;
}
</style>
