export class MatrixRotate {
  rotate(data: number[]): { rotated: number[]; isValid: boolean } {
    if (!this.canFormMatrix(data.length)) {
      return { rotated: [], isValid: false };
    }

    return { rotated: data, isValid: true };
  }

  private canFormMatrix(dataLength: number): boolean {
    return dataLength > 1 && Number.isInteger(Math.sqrt(dataLength));
  }
}
