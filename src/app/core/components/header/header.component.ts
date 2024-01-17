import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfigPreviewComponent } from 'src/app/dialog/config-preview/config-preview.component';
import { FORM_CONFIG } from 'src/app/shared/models/app.model';
import { DATE_FORMAT } from 'src/constants/app.const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input({ required: true }) currentIndex!: number;
  @Input({ required: true }) formConfigs!: Array<FORM_CONFIG>;
  @Output() updateCurrentIndex = new EventEmitter<number>();
  readonly DATE_FORMAT = DATE_FORMAT;

  constructor(private dialog: MatDialog) {}

  onHistoryChange(selectedIndex: number) {
    this.updateCurrentIndex.emit(selectedIndex);
  }

  openPreview() {
    this.dialog.open(ConfigPreviewComponent, { data: this.formConfigs[this.currentIndex] });
  }
}
