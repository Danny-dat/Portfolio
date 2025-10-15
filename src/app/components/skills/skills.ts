import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent {
@Input() currentLang: string = 'de';
}
