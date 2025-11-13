import { Component, effect, ElementRef, Renderer2 } from '@angular/core'; // WICHTIG: Neue Imports
import { CommonModule } from '@angular/common';
import { LanguageService, LanguageCode } from '../../language.service'; // WICHTIG: Service importieren

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class SkillsComponent {
  // Das alte "@Input() currentLang" wurde entfernt.

  // NEUE LOGIK (Constructor):
  constructor(
    private languageService: LanguageService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Dieser 'effect' wird automatisch ausgeführt, sobald 'activeLanguage' sich ändert
    effect(() => {
      const newLang = this.languageService.activeLanguage(); 
      this.updateActiveLanguage(newLang);
    });
  }

  // --- KORREKTUR FÜR NgIterable-FEHLER ---
  // *ngFor braucht ein Array, keine Zahl.
  // Wir erstellen ein Array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  public readonly totalSegmentsArray = Array(10).fill(0).map((_, i) => i + 1);

  // ALTE LOGIK (bleibt erhalten):
  programmingLanguages = [
    { name: 'JavaScript', level: 9, imgPath: 'assets/icon/JavaScript.svg' },
    { name: 'TypeScript', level: 8, imgPath: 'assets/icon/TypeScript.svg' },
    { name: 'Python', level: 6, imgPath: 'assets/icon/python.svg' },
    { name: 'PHP', level: 4, imgPath: 'assets/icon/php.svg' },
    { name: 'C#', level: 5, imgPath: 'assets/icon/csharp.svg' },
  ];

  developmentEnvironments = [
    { name: 'Angular', level: 8, imgPath: 'assets/icon/Angular.svg' },
    { name: 'Vue.js', level: 5, imgPath: 'assets/icon/vue.svg' },
    { name: 'Node.js', level: 6, imgPath: 'assets/icon/nodejs.svg' },
    { name: 'Docker', level: 4, imgPath: 'assets/icon/docker.svg' },
    { name: 'VS Code', level: 9, imgPath: 'assets/icon/vscode.svg' },
    { name: 'Git', level: 8, imgPath: 'assets/icon/GIT.svg' },
    { name: 'Firebase', level: 7, imgPath: 'assets/icon/Firebase.svg' },
    { name: 'MySQL', level: 6, imgPath: 'assets/icon/mysql.svg' },
  ];

  otherSkills = [
    { name: 'HTML5', level: 10, imgPath: 'assets/icon/HTML.svg' },
    { name: 'CSS3/SCSS', level: 9, imgPath: 'assets/icon/css.svg' },
    { name: 'Rest API', level: 7, imgPath: 'assets/icon/Rest-Api.svg' },
    { name: 'Scrum', level: 8, imgPath: 'assets/icon/Scrum.svg' },
    { name: 'Material Design', level: 7, imgPath: 'assets/icon/Material Design.svg' },
  ];

  getFilledSegments(level: number): number {
    return level;
  }

  getSkillColor(level: number): string {
    if (level <= 3) return '#e74c3c'; // Schwach (Rot)
    if (level <= 6) return '#f39c12'; // Mittel (Orange)
    if (level <= 8) return '#2ecc71'; // Gut (Grün)
    return '#3498db'; // Sehr Gut (Blau)
  } // <-- KORREKTUR: Fehlende schließende Klammer } hinzugefügt.

  /** <-- KORREKTUR: Fehlendes /** für den Kommentarblock hinzugefügt.
   * basierend auf der neuen Sprache.
   */
  private updateActiveLanguage(newLang: LanguageCode) {
    // 1. Finde alle 'i18n'-Elemente *innerhalb* dieser <app-skills>-Komponente
    const allElements: HTMLElement[] = Array.from(this.el.nativeElement.querySelectorAll('.i18n'));

    allElements.forEach(element => {
      this.renderer.removeClass(element, 'active');
      if (element.getAttribute('lang') === newLang) {
        this.renderer.addClass(element, 'active');
      }
    });
  }
}