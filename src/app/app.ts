import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importieren für *ngIf etc.

// Ihre Komponenten-Imports
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { PathComponent } from './components/path/path';
import { SkillsComponent } from './components/skills/skills';
import { ProjectsComponent } from './components/projects/projects';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true, // HIER FEHLTE DAS KOMMA
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    PathComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'Portfolio';

  // NEU: Diese Variable steuert die Sprache für die GESAMTE Anwendung
  currentLang = 'de'; // Wir starten mit Deutsch

  // NEU: Diese Methode wird vom Header aufgerufen, um die Sprache zu ändern
  switchLang(lang: string) {
    this.currentLang = lang;
  }
}