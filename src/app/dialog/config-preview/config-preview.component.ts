import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FORM_CONFIG } from 'src/app/shared/models/app.model';

@Component({
  selector: 'app-config-preview',
  templateUrl: './config-preview.component.html',
  styleUrls: ['./config-preview.component.scss']
})
export class ConfigPreviewComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: FORM_CONFIG) {}

}
