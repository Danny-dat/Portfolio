import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home'; // Importieren der neuen Home-Komponente
import { ProjectsComponent } from './components/projects/projects'; // ProjectsComponent ist bereits vorhanden
import { ImpressumComponent } from './pages/impressum/impressum'; // Importieren der Impressum-Komponente
import { DatenschutzComponent } from './pages/datenschutz/datenschutz'; // Importieren der Datenschutz-Komponente

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Startseite
  { path: 'projects', component: ProjectsComponent }, // Eigene Seite für Projekte
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  // Optional: Wildcard Route, um bei unbekannten Pfaden auf die Startseite umzuleiten
  { path: '**', redirectTo: '' }
];