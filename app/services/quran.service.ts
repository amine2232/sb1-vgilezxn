import { Http } from '@nativescript/core';

export class QuranService {
  private baseUrl = 'https://api.quran.com/api/v4';

  async getQuranPages(): Promise<any[]> {
    try {
      const response = await Http.getJSON(`${this.baseUrl}/quran/verses/uthmani?chapter_number=1`);
      return response.verses;
    } catch (error) {
      console.error('Error fetching Quran data:', error);
      return [];
    }
  }
}