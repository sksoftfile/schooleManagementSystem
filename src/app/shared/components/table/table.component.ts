import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() tableData: any;
  @Input() tableColumns: string[] = [];
  @Input() tableTitle: string = '';
  @Input() tableActions: boolean = false;
  @Input() emailAction: boolean = false;

  @Output() deleteRow: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateTable: EventEmitter<any> = new EventEmitter<any>();
  @Output() editRow: EventEmitter<string> = new EventEmitter<string>();

  dataSource: any;
  employeeSubscription: Subscription = new Subscription();

  constructor(public dialog: MatDialog, private service: StoreService) {}

  ngOnInit() {
    this.checkTableActions();
    this.tableData = new MatTableDataSource<any>(this.tableData);
  }

  checkTableActions() {
    if (this.tableActions) {
      this.tableColumns.push('edit');
    }
    if (this.emailAction) {
      this.tableColumns.push('emailAction');
    }
  }

  delete(id: string) {
    this.deleteRow.emit(id);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    let _dialog = this.dialog.open(DialogComponent, {
      width: '50vw',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {
        title: 'Add New Entry',
        formType: 'add',
      },
    });

    _dialog.afterClosed().subscribe((result) => {
      if (result != 'canceled') {
        this.saveEntry(result);
        this.updateTable.emit();
      }
    });
  }

  saveEntry(newEmployee: any) {
    this.service
      .saveStoreEmployeeInfo('Georgia', newEmployee)
      .subscribe((res: any) => {});

    this.employeeSubscription = this.service
      .getStoreEmployeeInfo('Georgia')
      .subscribe((data: any) => {
        this.tableData = Object.keys(data).map((key) => {
          return { ...data[key], id: key };
        });
      });
  }

  edit(employee: any) {
    let _dialog = this.dialog.open(DialogComponent, {
      width: '50vw',
      disableClose: true,
      data: {
        title: 'Edit: ' + employee.firstName + ' ' + employee.lastName,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        salary: employee.salary,
        role: employee.role,
        formType: 'edit',
        id: employee.id,
      },
    });

    _dialog.afterClosed().subscribe((result) => {
      if (result != 'canceled') {
        this.editRow.emit(result);
        this.updateTable.emit();
      }
    });
  }
}
