import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [], // HIER WURDE DER FOOTER-IMPORT ENTFERNT
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
@Input() currentLang: string = 'de';
}