export const httpErrorMap: Record<string, string> = {
  "400": "Bad user input",
  "401": "Unauthorized. Please log in",
  "403": "Forbidden. You do not have permission",
  "404": "Not found. The requested resource does not exist",
  "409": "Conflict. The request could not be completed due to a conflict",
  "500": "Internal server error. Please try again later",
  "503": "Service unavailable. Please try again later",
  "Failed to fetch": "Error occurred. Check your internet connection",
};

export const httpErrorFallback =
  "An unexpected error occurred. Please try again";
