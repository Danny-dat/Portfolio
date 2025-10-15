import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // WICHTIG: Importieren

@Component({
  selector: 'app-path',
  standalone: true,           // WICHTIG: Hinzufügen
  imports: [CommonModule],      // WICHTIG: Hinzufügen
  templateUrl: './path.html',
  styleUrls: ['./path.scss'] // Korrigiert von styleUrl zu styleUrls
})
export class PathComponent {
  @Input() currentLang: string = 'de';
}