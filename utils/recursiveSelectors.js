import CreateRecursiveSelectorsObject from "./createRecursiveSelectors.js";

export const tonaton = new CreateRecursiveSelectorsObject({
  container: ".details__images__container",
  image: ".details__images__item img",
  description: ".location h1",
  location: ".details__location span",
  details: ".details__description div",
  description_title: ".details__description__attribute-title",
  details__value: ".details__description__attribute-value",
});

export const jumia = new CreateRecursiveSelectorsObject({
  container: ".col12",
  image: '.itm img',
  description: ".-fs20",
  location: null,
  details: ".card-b ul",
  description_title: ".card-b ul li",
  details__value: ".card-b ul li",
});
