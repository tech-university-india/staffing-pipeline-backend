class HttpError extends Error {
  constructor(message, code) {
    super(message, code);
    this.statusCode = code;
  }
}

class NotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}
module.exports = { HttpError, NotFoundError };
