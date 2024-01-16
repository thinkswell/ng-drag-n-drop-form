import { Component, Input } from '@angular/core';
import { FORM_CONFIG } from 'src/app/shared/models/app.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input({ required: true }) currentIndex!: number;
  @Input({ required: true }) formConfigs!: Array<FORM_CONFIG>;
}
