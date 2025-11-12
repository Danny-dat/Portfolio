import { Injectable, signal } from '@angular/core';

// Definieren Sie den Typ global, damit alle Komponenten ihn verwenden können.
export type LanguageCode = 'de' | 'en' | 'es';

@Injectable({
  // providedIn: 'root' macht diesen Service als Singleton in der gesamten App verfügbar.
  providedIn: 'root'
})
export class LanguageService {
  // Globales Signal, das die aktive Sprache speichert.
  // Es wird mit 'de' (Deutsch) initialisiert.
  public readonly activeLanguage = signal<LanguageCode>('de');

  /**
   * Ändert die globale aktive Sprache.
   * Komponenten im Template verwenden dieses Signal, um die Anzeige umzuschalten.
   * @param lang Das neue Sprachkürzel ('de', 'en', 'es').
   */
  setLanguage(lang: LanguageCode): void {
    this.activeLanguage.set(lang);
    // Wenn Sie Persistenz wünschen, können Sie hier localStorage verwenden:
    // localStorage.setItem('appLang', lang); 
  }
}