class HttpError extends Error {
  constructor(message, code) {
<<<<<<< HEAD
    super(message, code);
    this.statusCode = code;
  }
}
module.exports = HttpError;
=======
    super(message); //
    this.code = code; //
  }
}
>>>>>>> 19bf866 (chore: formatting with prettier)
