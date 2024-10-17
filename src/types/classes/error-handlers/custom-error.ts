export default class CustomError {
  public message: string;
  public code: string;
  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}
