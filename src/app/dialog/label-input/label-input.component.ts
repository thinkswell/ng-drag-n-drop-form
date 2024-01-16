import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-label-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.scss']
})
export class LabelInputComponent {
  label!: string;

  constructor(private dialogRef: MatDialogRef<LabelInputComponent>) {
    dialogRef.disableClose = true;
  }

  handleSubmit() {
    this.dialogRef.close(this.label);
  }

}
