import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importiere den Router

@Component({
  selector: 'app-datenschutz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datenschutz.html',
  styleUrls: ['./datenschutz.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatenschutzComponent {
  
  // Router injizieren, um Navigation zu ermöglichen
  constructor(private router: Router) {}

  /**
   * Navigiert zur Startseite (Hauptroute "/").
   */
  goBack(): void {
    this.router.navigate(['/']); // Zur Startseite navigieren
  }
}