function SuccessResponseObject(data = [], message = null, success = false) {
  this.data = data;
  this.message = message;
  this.success = success;
}

export default SuccessResponseObject;
