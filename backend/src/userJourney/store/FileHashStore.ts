export class FileHashStore {
  private static hashSet = new Set<string>();

  static exists(hash: string): boolean {
    return this.hashSet.has(hash);
  }

  static add(hash: string): void {
    this.hashSet.add(hash);
  }
}
