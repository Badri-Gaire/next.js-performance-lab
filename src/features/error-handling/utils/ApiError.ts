export class ApiError extends Error {
  public statusCode: number;
  public url?: string;
  public statusText?: string;

  constructor(message: string, statusCode: number, url?: string, statusText?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.url = url;
    this.statusText = statusText;

    // Ensure the prototype is correctly set for built-in Error extension
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Serializes the error into a JSON string for server-to-client transmission
   */
  public serialize() {
    return JSON.stringify({
      message: this.message,
      statusCode: this.statusCode,
      url: this.url,
      statusText: this.statusText,
      name: this.name,
    });
  }

  /**
   * Reconstructs an ApiError from a serialized string
   */
  public static deserialize(jsonString: string): ApiError {
    try {
      const data = JSON.parse(jsonString);
      return new ApiError(data.message, data.statusCode, data.url, data.statusText);
    } catch {
      return new ApiError('An unknown error occurred', 500);
    }
  }
}
