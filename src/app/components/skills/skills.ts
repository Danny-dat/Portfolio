import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // WICHTIG: Importieren

// Interface für unsere Skills
interface IBarSkill {
  name: string;
  level: number; // Prozentzahl von 0-100
  imgPath: string; // Pfad zum Icon
}

@Component({
  selector: 'app-skills',
  standalone: true,           // WICHTIG: Hinzufügen
  imports: [CommonModule],      // WICHTIG: Hier hinzufügen
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']  // Zu 'styleUrls' (mit 's') geändert
})
export class SkillsComponent {
  @Input() currentLang: string = 'de'; 

  // ========================================================
  // SKILL-DATEN (Passe Level und Pfade nach Bedarf an)
  // ========================================================

  programmingLanguages: IBarSkill[] = [
    { name: 'HTML5', level: 95, imgPath: 'assets/icon/HTML.svg' },
    { name: 'Angular', level: 75, imgPath: 'assets/icon/Angular.svg' },
    { name: 'JavaScript', level: 85, imgPath: 'assets/icon/JavaScript.svg' },
    { name: 'TypeScript', level: 80, imgPath: 'assets/icon/TypeScript.svg' },
    { name: 'Python', level: 50, imgPath: 'assets/icon/python.svg' },
    { name: 'C#', level: 30, imgPath: 'assets/icon/csharp.svg' }, 
  ];

  developmentEnvironments: IBarSkill[] = [
    { name: 'VS Code', level: 95, imgPath: 'assets/icon/vscode.svg' },
    { name: 'Docker', level: 40, imgPath: 'assets/icon/docker.svg' },
    { name: 'SQL-Server', level: 50, imgPath: 'assets/icon/mysql.svg' }, 
  ];

  otherSkills: IBarSkill[] = [
    { name: 'Scrum', level: 85, imgPath: 'assets/icon/Scrum.svg' },
    { name: 'GIT', level: 80, imgPath: 'assets/icon/GIT.svg' },
    { name: 'Rest-API', level: 70, imgPath: 'assets/icon/Rest-Api.svg' },
    { name: 'Firebase', level: 60, imgPath: 'assets/icon/Firebase.svg' },
  ];

  // ========================================================
  // Helfer-Funktionen (Unverändert)
  // ========================================================

  totalSegments = [1, 2, 3, 4, 5, 6];

  getFilledSegments(level: number): number {
    return Math.ceil((level / 100) * 6);
  }

  getSkillColor(level: number): string {
    const filledSegments = this.getFilledSegments(level);

    if (filledSegments <= 2) {
      return '#e74c3c'; // Rot
    } else if (filledSegments === 3) {
      return '#f1c40f'; // Gelb
    } else {
      return '#2ecc71'; // Grün
    }
  }
}