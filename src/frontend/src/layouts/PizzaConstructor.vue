<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="dough in doughs"
                :key="dough.name"
                :class="`dough__input dough__input--${getDoughClass(
                  dough.name
                )}`"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="getDoughClass(dough.name)"
                  class="visually-hidden"
                  checked=""
                />
                <b>{{ dough.name }}</b>
                <span>{{ dough.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="size in sizes"
                :key="size.name"
                :class="`diameter__input diameter__input--${getSizeClass(
                  size.name
                )}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="getSizeClass(size.name)"
                  class="visually-hidden"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  class="radio ingredients__input"
                  v-for="sauce in sauces"
                  :key="sauce.name"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="getSaucesClass(sauce.name)"
                    checked=""
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    class="ingredients__item"
                    v-for="ingredient in ingredients"
                    :key="ingredient.name"
                  >
                    <span
                      :class="`filling filling--${getIngredientClass(
                        ingredient.name
                      )}`"
                    >
                      {{ ingredient.name }}
                    </span>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled=""
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled="">Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizzaJsonData from "@/static/pizza.json";
export default {
  name: "PizzaConstructor",
  data() {
    return {
      doughs: pizzaJsonData.dough,
      ingredients: pizzaJsonData.ingredients,
      sauces: pizzaJsonData.sauces,
      sizes: pizzaJsonData.sizes,
    };
  },
  methods: {
    getDoughClass(name) {
      switch (name) {
        case "Тонкое":
          return "light";
        default:
          return "large";
      }
    },
    getSaucesClass(name) {
      switch (name) {
        case "Томатный":
          return "tomato";
        default:
          return "creamy";
      }
    },
    getSizeClass(name) {
      switch (name) {
        case "23 см":
          return "small";
        case "32 см":
          return "normal";
        default:
          return "big";
      }
    },
    getIngredientClass(name) {
      switch (name) {
        case "Грибы":
          return "mushrooms";
        case "Чеддер":
          return "cheddar";
        case "Салями":
          return "salami";
        case "Ветчина":
          return "ham";
        case "Ананас":
          return "ananas";
        case "Бекон":
          return "bacon";
        case "Лук":
          return "onion";
        case "Чили":
          return "chile";
        case "Халапеньо":
          return "jalapeno";
        case "Маслины":
          return "olives";
        case "Томаты":
          return "tomatoes";
        case "Лосось":
          return "salmon";
        case "Моцарелла":
          return "mozzarella";
        case "Блю чиз":
          return "blue_cheese";
        default:
          return "parmesan";
      }
    },
  },
};
</script>
