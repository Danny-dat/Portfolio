import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importiere den Router

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impressum.html',
  styleUrls: ['./impressum.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpressumComponent {
  
  // Router injizieren, um Navigation zu ermöglichen
  constructor(private router: Router) {}

  /**
   * Navigiert zur Startseite (Hauptroute "/").
   */
  goBack(): void {
    this.router.navigate(['/']); // Zur Startseite navigieren
  }
}