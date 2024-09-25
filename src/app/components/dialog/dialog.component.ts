import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    private builder: FormBuilder
  ) {}

  inputData: any;
  closeMessage: string = 'canceled';
  dialogForm: any;

  ngOnInit(): void {
    this.createForm();
    this.inputData = this.data;
  }
  confirm(newData: any): void {
    if (this.dialogForm.invalid) {
      console.log('invalid');
      console.log(this.dialogForm);
      return;
    } else {
      if (this.inputData.formType == 'add') {
        this.addEntry();
      }
      if (this.inputData.formType == 'edit') {
        this.editEntry();
      }
    }
  }

  addEntry(): void {
    this.dialogRef.close(this.dialogForm.value);
  }

  editEntry(): void {
    this.dialogRef.close(this.dialogForm.value);
  }

  createForm(): void {
    this.dialogForm = this.builder.group({
      firstName: this.builder.control(
        this.data.firstName ?? '',
        Validators.required
      ),
      lastName: this.builder.control(
        this.data.lastName ?? '',
        Validators.required
      ),
      email: this.builder.control(this.data.email ?? '', [
        Validators.required,
        Validators.email,
      ]),
      phone: this.builder.control(this.data.phone ?? '', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      salary: this.builder.control(this.data.salary ?? '', Validators.required),
      role: this.builder.control(this.data.role ?? '', Validators.required),
      id: this.builder.control(this.data.id ?? ''),
    });
  }
}
