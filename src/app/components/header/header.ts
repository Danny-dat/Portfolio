import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements AfterViewInit {
  @Input() currentLang: string = 'de';
  @Output() languageChanged = new EventEmitter<string>();

  private currentlyHighlightedElement: HTMLElement | null = null;
  public isBrowser: boolean;

  // Wir "injizieren" die PLATFORM_ID, um herauszufinden, wo der Code läuft.
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  // ngAfterViewInit wird aufgerufen, nachdem die Komponente im Browser initialisiert wurde.
  // Das ist der beste Ort für DOM-Interaktionen wie Event Listener.
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Dieser Code läuft jetzt sicher nur im Browser.
      window.addEventListener('beforeunload', () => {
        speechSynthesis.cancel();
      });
    }
  }

  switchLang(lang: string) {
    this.languageChanged.emit(lang);
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
    // Die gesamte Funktion wird nur im Browser ausgeführt.
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
          const voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith(this.currentLang));
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