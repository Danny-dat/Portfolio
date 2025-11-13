import { Component, effect, ElementRef, Renderer2 } from '@angular/core'; // WICHTIGE IMPORTS
import { CommonModule } from '@angular/common';
import { LanguageService, LanguageCode } from '../../language.service'; // SERVICE IMPORTIEREN

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent {

  // Services im Konstruktor "injizieren"
  constructor(
    private languageService: LanguageService,
    private el: ElementRef,         // Um auf das DOM-Element dieser Komponente zuzugreifen
    private renderer: Renderer2     // Um das DOM sicher zu ändern
  ) {
    
    // Dieser 'effect' wird automatisch ausgeführt, sobald 'activeLanguage' sich ändert
    effect(() => {
      // 1. Das Signal lesen (z.B. 'de', 'en' oder 'es')
      const newLang = this.languageService.activeLanguage(); 
      
      // 2. Eine Helfer-Funktion aufrufen, um das HTML zu aktualisieren
      this.updateActiveLanguage(newLang);
    });
  }

  /**
   * Diese Funktion aktualisiert die 'active'-Klasse auf den .i18n-Elementen
   * basierend auf der neuen Sprache.
   */
  private updateActiveLanguage(newLang: LanguageCode) {
    // 1. Finde alle 'i18n'-Elemente *innerhalb* dieser <app-hero>-Komponente
    const allElements: HTMLElement[] = this.el.nativeElement.querySelectorAll('.i18n');

    allElements.forEach(element => {
      // 2. Entferne zuerst 'active' von allen Elementen
      this.renderer.removeClass(element, 'active');

      // 3. Füge 'active' nur dem Element hinzu, das zur neuen Sprache passt
      if (element.getAttribute('lang') === newLang) {
        this.renderer.addClass(element, 'active');
      }
    });
  }
}