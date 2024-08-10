import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrl: './confirmdialog.component.css'
})
export class ConfirmdialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmdialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
