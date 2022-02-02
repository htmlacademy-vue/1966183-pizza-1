export const getDoughClass = (name) => {
  switch (name) {
    case "Тонкое":
      return "light";
    default:
      return "large";
  }
};
export const getSaucesClass = (name) => {
  switch (name) {
    case "Томатный":
      return "tomato";
    default:
      return "creamy";
  }
};
export const getSizeClass = (name) => {
  switch (name) {
    case "23 см":
      return "small";
    case "32 см":
      return "normal";
    default:
      return "big";
  }
};
export const getIngredientClass = (name) => {
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
};

export const getSauce = (type) => {
  return type === "tomato" ? "Томатный" : "Сливочный";
};

export const getSize = (type) => {
  switch (type) {
    case "big":
      return "45 см";
    case "normal":
      return "32 см";
    default:
      return "23 см";
  }
};

export const getDough = (type) => {
  return type === "light" ? "Тонкое" : "Толстое";
};

export const getCorrectClass = (name, selectorType) => {
  switch (selectorType) {
    case "dough":
      return getDoughClass(name);
    case "ingredients":
      return getIngredientClass(name);
    case "sauces":
      return getSaucesClass(name);
    default:
      return getSizeClass(name);
  }
};
