import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // WICHTIG: Importieren

@Component({
  selector: 'app-hero',
  standalone: true,           // WICHTIG: Hinzufügen
  imports: [CommonModule],      // WICHTIG: Hinzufügen
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'] // Korrigiert von styleUrl zu styleUrls (Standard)
})
export class HeroComponent {
  @Input() currentLang: string = 'de';
}