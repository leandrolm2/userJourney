import fs from 'fs';
import path from 'path';
import { UserJourney } from '../types/userJourney';

const DATA_PATH = path.join(__dirname, './data/processedData.json');

export class FileDataStore {
  private static ensureFileExists(): void {
    if (!fs.existsSync(DATA_PATH)) {
      fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
      fs.writeFileSync(DATA_PATH, JSON.stringify([]), 'utf-8');
    }
  }

  static saveData(newData: any[]): UserJourney[] {
    this.ensureFileExists();

    const existing = this.readAll();
    const updated: UserJourney[] = [...existing, ...newData];

    fs.writeFileSync(DATA_PATH, JSON.stringify(updated, null, 2), 'utf-8');

    return updated
  }

  static readAll(): UserJourney[] {
    this.ensureFileExists();
    const file = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(file);
  }

  static queryBySessionId(sessionId: string): any[] {
    const allData = this.readAll();
    return allData.filter(item => item.sessionId === sessionId);
  }
}
