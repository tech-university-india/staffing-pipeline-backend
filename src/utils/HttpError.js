class HttpError extends Error {
  constructor(message, code) {
    super(message, code);
    this.statusCode = code;
  }
}
module.exports = HttpError;
