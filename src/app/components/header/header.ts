import { Component, Inject, PLATFORM_ID, AfterViewInit, Signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LanguageService, LanguageCode } from '../../language.service'; // Importieren

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements AfterViewInit {
  // @Input und @Output sind entfernt

  private currentlyHighlightedElement: HTMLElement | null = null;
  public isBrowser: boolean;
  public readonly currentLang: Signal<LanguageCode>; // Ist jetzt ein Signal

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public languageService: LanguageService // Service injizieren
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Signal direkt vom Service übernehmen
    this.currentLang = this.languageService.activeLanguage;
  }
  
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      window.addEventListener('beforeunload', () => {
        speechSynthesis.cancel();
      });
    }
  }

  // Diese Methode ändert jetzt das Signal im Service
  switchLang(lang: LanguageCode) {
    console.log('Wechsle Sprache zu:', lang);
    this.languageService.activeLanguage.set(lang);
    console.log('Neuer aktiver Wert:', this.currentLang());
  }

  isDarkMode = false;
  isAccessibilityOpen = false;

  toggleTheme() {
    if (this.isBrowser) {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  }

  toggleAccessibilityMenu() {
    this.isAccessibilityOpen = !this.isAccessibilityOpen;
  }

  private isElementInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  speakContent() {
    if (this.isBrowser) {
      if (!('speechSynthesis' in window)) {
        console.error('Die Sprachausgabe wird von diesem Browser nicht unterstützt.');
        return;
      }

      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        if (this.currentlyHighlightedElement) {
          this.currentlyHighlightedElement.classList.remove('speaking-highlight');
          this.currentlyHighlightedElement = null;
        }
        return;
      }

      const allActiveElements = document.querySelectorAll('main .i18n.active');
      const visibleElements = Array.from(allActiveElements).filter(el => this.isElementInViewport(el as HTMLElement)) as HTMLElement[];

      if (visibleElements.length === 0) {
        return;
      }
      
      visibleElements.forEach(element => {
        const text = element.innerText;
        if (text && text.trim().length > 0) {
          const utterance = new SpeechSynthesisUtterance(text);
          
          // KORREKTUR HIER: this.currentLang() mit Klammern aufrufen
          const voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith(this.currentLang()));
          utterance.voice = voices[0] || null;

          utterance.onstart = () => {
            if (this.currentlyHighlightedElement) {
              this.currentlyHighlightedElement.classList.remove('speaking-highlight');
            }
            element.classList.add('speaking-highlight');
            this.currentlyHighlightedElement = element;
          };
          
          speechSynthesis.speak(utterance);
        }
      });

      const finalUtterance = new SpeechSynthesisUtterance('');
      finalUtterance.onstart = () => {
         if (this.currentlyHighlightedElement) {
              this.currentlyHighlightedElement.classList.remove('speaking-highlight');
              this.currentlyHighlightedElement = null;
          }
      };
      speechSynthesis.speak(finalUtterance);
    }
  }
  
  toggleContrast() {
    if (this.isBrowser) {
      document.body.classList.toggle('high-contrast');
    }
  }

  changeTextSize(increase: boolean) {
    if (this.isBrowser) {
      const root = document.documentElement;
      const currentSize = root.style.fontSize || '100%';
      if (increase) {
          root.style.fontSize = (parseInt(currentSize) + 10) + '%';
      } else {
          root.style.fontSize = (parseInt(currentSize) - 10) + '%';
      }
    }
  }
}