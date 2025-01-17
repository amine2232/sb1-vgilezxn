import { Observable } from '@nativescript/core';
import { QuranService } from './services/quran.service';

export class QuranViewModel extends Observable {
  private _quranPages: any[] = [];
  private _isLoading: boolean = false;
  private quranService: QuranService;

  constructor() {
    super();
    this.quranService = new QuranService();
    this.loadQuranPages();
  }

  get quranPages(): any[] {
    return this._quranPages;
  }

  set quranPages(value: any[]) {
    if (this._quranPages !== value) {
      this._quranPages = value;
      this.notifyPropertyChange('quranPages', value);
    }
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(value: boolean) {
    if (this._isLoading !== value) {
      this._isLoading = value;
      this.notifyPropertyChange('isLoading', value);
    }
  }

  async loadQuranPages() {
    try {
      this.isLoading = true;
      const verses = await this.quranService.getQuranPages();
      this.quranPages = verses.map(verse => ({
        text: verse.text_uthmani,
        verseKey: verse.verse_key
      }));
    } catch (error) {
      console.error('Error loading Quran pages:', error);
    } finally {
      this.isLoading = false;
    }
  }
}