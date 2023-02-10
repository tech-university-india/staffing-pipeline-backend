class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

class NotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}
module.exports = { HttpError, NotFoundError };
