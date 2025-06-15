import crypto from 'crypto';

export class HashUtil {
  static generateHash(buffer: Buffer): string {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }
}
