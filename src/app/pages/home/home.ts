import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Ihre bestehenden Inhaltskomponenten
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
  template: `
    <main>
      <app-hero [currentLang]="currentLang"></app-hero>
      <app-path [currentLang]="currentLang"></app-path>
      <app-skills [currentLang]="currentLang"></app-skills>
      <app-projects [currentLang]="currentLang"></app-projects>
      <app-contact [currentLang]="currentLang"></app-contact>
    </main>
  `,
  styleUrls: ['../../app.scss'] // Verwenden Sie Ihre Haupt-Styles oder erstellen Sie neue
})
export class HomeComponent {
  @Input() currentLang: string = 'de';
}