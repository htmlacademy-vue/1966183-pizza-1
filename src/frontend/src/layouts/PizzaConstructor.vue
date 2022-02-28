<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <builder-dough-selector
                v-for="dough in doughs"
                :key="dough.name"
                :item="dough"
                selector-type="dough"
                subtype="dough"
                @changeDough="changeDough"
                :doughType="doughType"
              />
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <builder-size-selector
                v-for="size in sizes"
                :key="size.name"
                :item="size"
                selector-type="diameter"
                :sizeType="sizeType"
                @changeSize="changeSize"
              />
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
                <builder-sauce-selector
                  v-for="sauce in sauces"
                  :key="sauce.name"
                  :item="sauce"
                  selector-type="sauces"
                  :sauceType="sauceType"
                  @setSauce="setSauce"
                />
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul class="ingredients__list">
                  <builder-ingredients-selector
                    v-for="ingredient in baseIngredients"
                    :key="ingredient.name"
                    :ingredient="ingredient"
                    @setInParent="setCounter"
                    :count="getCountIngredient(ingredient.id)"
                    @changeCount="
                      changeCountIngredients(ingredient.name, $event)
                    "
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="content__pizza">
          <builder-pizza-name :value="name" @input="changePizzaName" />
          <builder-pizza-view
            :fillings="nameIngredients"
            :sauce="sauceType"
            :size="sizeType"
            :dough="doughType"
            @getName="changeCountIngredientsByDragAndDrop"
          />
          <builder-price-counter
            :price="price"
            @addPizza="addPizza"
            :buttonDisabled="buttonDisabled"
          />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaName from "@/modules/builder/components/BuilderPizzaName.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import {
  getDough,
  getDoughClass,
  getSauce,
  getSaucesClass,
  getSize,
  getSizeClass,
} from "../common/helpers/classes";
import {
  findClassById,
  findId,
  findIdByClass,
  findNameById,
} from "../common/helpers/pizzasFormat";

export default {
  name: "PizzaConstructor",
  components: {
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderSauceSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderPizzaName,
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations("Cart", ["addPizzaToBasket"]),
    addPizza() {
      this.$store.commit("Builder/setPizzaPrice", this.price);
      this.addPizzaToBasket({
        ...this.newPizza,
        ingredients: [...this.newPizza.ingredients],
      });
      this.$store.commit("Builder/setBuilderToDefault");
    },
    changeDough(event) {
      const id = findIdByClass(event, this.doughs, getDough);
      this.$store.commit("Builder/changeDough", id);
    },
    changeSize(event) {
      const id = findIdByClass(event, this.sizes, getSize);
      this.$store.commit("Builder/changeSize", id);
    },
    setSauce(event) {
      const id = findIdByClass(event, this.sauces, getSauce);
      this.$store.commit("Builder/setSauce", id);
    },
    getCountIngredient(id) {
      if (this.ingredients.length !== 0) {
        const needItem = this.ingredients.find(
          (item) => item.ingredientId === id
        );
        return needItem ? needItem.quantity : 0;
      }
      return 0;
    },
    changeCountIngredients(name, event) {
      this.$store.commit("Builder/changeCountIngredients", {
        ingredientId: findId(name, this.baseIngredients),
        quantity: event,
      });
    },
    changePizzaName(event) {
      this.$store.commit("Builder/changePizzaName", event);
    },
    changeCountIngredientsByDragAndDrop(event) {
      const ingredientId = findId(event, this.fillings.ingredients);
      const currentIngredient = this.ingredients.find(
        (item) => item.ingredientId === ingredientId
      );
      const quantity = currentIngredient ? currentIngredient.quantity + 1 : 1;
      this.$store.commit("Builder/changeCountIngredients", {
        ingredientId,
        quantity,
      });
    },
    setCounter(event) {
      this.$store.commit("Builder/setCounter", event);
    },
  },
  computed: {
    ...mapState("Builder", [
      "name",
      "ingredients",
      "sauceId",
      "sizeId",
      "doughId",
    ]),
    ...mapState("IngredientsProducts", ["fillings"]),
    ...mapGetters("Builder", ["allIngredients", "price"]),
    newPizza() {
      return this.allIngredients;
    },
    sauceType() {
      return findClassById(this.sauceId, this.sauces, getSaucesClass);
    },
    sizeType() {
      return findClassById(this.sizeId, this.sizes, getSizeClass);
    },
    doughType() {
      return findClassById(this.doughId, this.doughs, getDoughClass);
    },
    baseIngredients() {
      return this.fillings.ingredients;
    },
    doughs() {
      return this.fillings.dough;
    },
    sizes() {
      return this.fillings.sizes;
    },
    sauces() {
      return this.fillings.sauces;
    },
    nameIngredients() {
      return this.ingredients.map((item) => {
        return [
          findNameById(item.ingredientId, this.baseIngredients),
          item.quantity,
        ];
      });
    },
    buttonDisabled() {
      return (
        this.ingredients.every((item) => item.quantity === 0) ||
        this.name === ""
      );
    },
  },
};
</script>
