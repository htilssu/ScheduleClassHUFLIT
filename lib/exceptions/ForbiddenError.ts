export class ForbiddenError extends Error {
  constructor(message: string = "Bạn không có quyền thực hiện hành động này") {
    super(message);
    this.name = "ForbiddenError";
  }
}
