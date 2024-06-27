import { db } from '@/lib/config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

class SettingsRepository {
  async setSettings(settings: Settings) {
    await setDoc(doc(db, 'settings', 'default'), settings);
  }

  async getSettings() {
    const docRef = doc(db, 'settings', 'default');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Settings;
    } else {
      return null;
    }
  }
}

export const settingsRepository = new SettingsRepository();
