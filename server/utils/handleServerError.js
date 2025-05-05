export const handleError = (res, error) => {
  console.error("Error:", error.message); //! Log error to console

  // !If the error object has a statusCode, use it, else default to 500 (Internal Server Error)
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};
