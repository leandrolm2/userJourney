import xlsx from 'xlsx';
import { HashUtil } from './utils/HashUtil ';
import { Filter } from './utils/orderData';
import { FileHashStore } from './store/FileHashStore';
import { FileDataStore } from './store/FileDataStore';
import { UserJourney } from './types/userJourney';

export class UserJourneyService {
  update(buffer: Buffer): { grouped: Record<string, UserJourney[]>, isDuplicate: boolean } {
    const hash = HashUtil.generateHash(buffer);

    if (FileHashStore.exists(hash)) {
      return { grouped: {}, isDuplicate: true };
    }

    FileHashStore.add(hash);

    //read data
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data: UserJourney[] = xlsx.utils.sheet_to_json(sheet);

    const newData: UserJourney[] = FileDataStore.saveData(data);

    const grouped = Filter.orderBySessionId(newData);

    return { grouped, isDuplicate: false };
  }

  get():Record<string, UserJourney[]> {
    const newData = FileDataStore.readAll()
    const grouped = Filter.orderJourney(newData)

    return grouped
  }
}
