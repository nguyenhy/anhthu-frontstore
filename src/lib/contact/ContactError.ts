import { AppError } from "@/lib/error";

export class ContactError extends AppError {
  readonly errorId?: string;
  readonly statusCode?: number;

  constructor(
    message: string,
    options?: { errorId?: string; statusCode?: number },
  ) {
    super(message);
    this.name = "ContactError";
    this.errorId = options?.errorId;
    this.statusCode = options?.statusCode;
  }

  isClientError(): boolean {
    return (
      this.statusCode !== undefined &&
      this.statusCode >= 400 &&
      this.statusCode < 500
    );
  }

  isServerError(): boolean {
    return this.statusCode !== undefined && this.statusCode >= 500;
  }
}
