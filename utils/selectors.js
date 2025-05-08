
import CreateSelectorsObject from "./createSelectorsObject.js";

export const kikuuSelectors = new CreateSelectorsObject({
  product__container: ".searchGoods-item___3gN71",
  product__image: ".product__image img",
  product__price: ".product__price",
  product__location: ".product__location",
  product__description: ".product__description",
  product__status: null,
  product__site__like:"kikuu"
});

export const frankoSelectors = new CreateSelectorsObject({
  product__container: ".searchGoods-item___3gN71",
  product__image: ".product__image img",
  product__price: ".product__price",
  product__location: ".product__location",
  product__description: ".product__description",
  product__status: null,
  product__site__like:"franko"
});

export const bayghSelectors = new CreateSelectorsObject({
  product__container: ".item-list",
  product__image: ".add-image a img",
  product__price: ".item-price",
  product__location: null,
  product__description: ".add-title a",
  product__status: null,
  product__site__like:null
});

export const compuGhanaSelectors = new CreateSelectorsObject({
  product__container: ".product-item",
  product__image: ".product-item-photo a .product-image-photo",
  product__price: ".price",
  product__location: null,
  product__description: ".product-item-name a",
  product__status: null,
  product__site__like:null
});

export const frankoTradingSelectors = new CreateSelectorsObject({
  product__container: ".product-list-item",
  product__image: ".ant-avatar img",
  product__price: null,
  product__location: null,
  product__description: ".ant-list-item-meta-description span",
  product__status: ".product-status",
});

export const jijiSelectors = new CreateSelectorsObject({
  product__container: ".masonry-item",
  product__image: ".b-list-advert-base__img picture img",
  product__price: ".qa-advert-price",
  product__location: ".b-list-advert__region_text",
  product__description: null,
  product__status: null,
  product__site__like:null
});

export const jumiaSelectors = new CreateSelectorsObject({
  product__container: "article.prd",
  product__image: "img.img",
  product__price: "div.prc",
  product__location: "div.seller-location",
  product__description: "h3.name",
  product__status: null,
  product__site__like:null
});

export const tonatonSelectors = new CreateSelectorsObject({
  product__container: ".product__container",
  product__image: ".product__image img",
  product__price: ".product__title",
  product__location: ".product__location",
  product__description: ".product__description",
  product__status: null,
});

export const shopBeautyBoothSelectors = new CreateSelectorsObject({
  product__container: ".product_cat-oral-care-selfcare-wellness",
  product__image: ".jupiterx-wc-loop-product-image img",
  product__price: ".woocommerce-Price-amount",
  product__location: null,
  product__description: ".woocommerce-loop-product__title",
  product__status: null,
  product__site__like:null
});
