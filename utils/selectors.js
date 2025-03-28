import CreateSelectorsObject from "./createSelectorsObject.js";

export const kikuuSelectors = new CreateSelectorsObject(
  ".searchGoods-item___3gN71",
  ".product__image img",
  ".product__price",
  ".product__location",
  ".product__description",
  ".product__tags span",
  ".product__container a"
);

export const frankoSelectors = new CreateSelectorsObject(
  ".searchGoods-item___3gN71",
  ".product__image img",
  ".product__price",
  ".product__location",
  ".product__description",
  ".product__tags span",
  ".product__container a"
);

export const bayghSelectors = new CreateSelectorsObject(
  ".item-list",
  ".add-image a img",
  ".item-price",
  null, // No location selector provided
  ".add-title a",
  null, // No status provided
  ".add-title a"
);

export const compuGhanaSelectors = new CreateSelectorsObject(
  ".product-item",
  ".product-item-photo a .product-image-photo",
  ".price",
  null, // No location selector provided
  ".product-item-name a",
  null, // No status provided
  ".product-item-link"
);

export const frankoTradingSelectors = new CreateSelectorsObject(
  ".product-list-item",
  ".ant-avatar img",
  ".ant-list-item-meta-description span",
  null, // No location selector provided
  ".ant-list-item-meta-title span",
  ".product-status",
  "a"
);

export const jijiSelectors = new CreateSelectorsObject(
  ".masonry-item",
  ".b-list-advert-base__img picture source",
  ".qa-advert-price",
  ".b-list-advert__region_text",
  ".b-advert-title-inner",
  null, // No status selector provided
  ".b-list-advert__gallery__item a"
);

export const jumiaSelectors = new CreateSelectorsObject(
  ".prd",
  ".img-c img",
  ".prc",
  null, // No location selector provided
  "h3",
  null, // No status selector provided
  "a"
);

export const tonatonSelectors = new CreateSelectorsObject(
  ".product__container",
  ".product__image img",
  ".product__title",
  ".product__location",
  ".product__description",
  ".product__tags span",
  ".product__container a"
);

export const shopBeautyBoothSelectors = new CreateSelectorsObject(
  ".product_cat-oral-care-selfcare-wellness",
  ".jupiterx-wc-loop-product-image img",
  ".woocommerce-Price-amount",
  null,
  ".woocommerce-loop-product__title",
  null,
  ".woocommerce-LoopProduct-link"
);
