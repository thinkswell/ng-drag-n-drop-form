import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ConfigPreviewComponent } from 'src/app/dialog/config-preview/config-preview.component';
import { FORM_CONFIG } from 'src/app/shared/models/app.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input({ required: true }) currentIndex!: number;
  @Input({ required: true }) formConfigs!: Array<FORM_CONFIG>;
  @Output() updateCurrentIndex = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {}

  onHistoryChange(selectedIndex: number) {
    console.log({ selectedIndex });
    this.updateCurrentIndex.emit(selectedIndex);
  }

  openPreview() {
    this.dialog.open(ConfigPreviewComponent, {data: this.formConfigs[this.currentIndex]});
  }
}
