import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Komponenten-Imports
import { HeroComponent } from '../../components/hero/hero';
import { PathComponent } from '../../components/path/path';
import { SkillsComponent } from '../../components/skills/skills';
import { ProjectsComponent } from '../../components/projects/projects';
import { ContactComponent } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    PathComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent
  ],
  // WICHTIG: Das Template wurde bereinigt
  template: `
    <!-- ALLE [currentLang]-Bindungen wurden entfernt -->
    <app-hero></app-hero>
    <app-path></app-path>
    <app-skills></app-skills>
    <app-projects></app-projects>
    <app-contact></app-contact> 
  `
})
export class HomeComponent {
  // Die alte 'currentLang'-Logik wurde entfernt, da sie nicht mehr benötigt wird.
  // Jede Komponente holt sich die Sprache jetzt selbst vom LanguageService.
}