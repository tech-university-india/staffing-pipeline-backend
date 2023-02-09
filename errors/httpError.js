class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

class NotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.errorCode = 404;
  }
}
module.exports = { HttpError, NotFoundError };
