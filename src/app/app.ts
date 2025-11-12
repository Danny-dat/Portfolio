import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router'; // ⬅️ NEU

// Ihre Komponenten-Imports
import { HeaderComponent } from './components/header/header';
// ALLE INHALTSKOMPONENTEN (Hero, Path, Skills, Projects, Contact) ENTFERNEN
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    CommonModule,
    RouterOutlet, // ⬅️ Hinzufügen
    HeaderComponent,
    FooterComponent
    // Inhaltskomponenten entfernt
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'Portfolio';
  currentLang = 'de'; 

  switchLang(lang: string) {
    this.currentLang = lang;
  }
}