function CreateSelectorsObject({
  product__container,
  product__image,
  product__price,
  product__location,
  product__description,
  product__status,
  product__site__link,
}) {
  this.product__container = product__container;
  this.product__image = product__image;
  this.product__price = product__price;
  this.product__site__link=product__site__link;
  (this.product__location = product__location);
    (this.product__description = product__description);
    (this.product__status = product__status);
}

export default CreateSelectorsObject;

