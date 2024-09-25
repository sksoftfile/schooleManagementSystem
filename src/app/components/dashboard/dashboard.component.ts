import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading: boolean = true;
  employeeSubscription: Subscription = new Subscription();

  employeeColumns: string[] = ['name', 'role', 'phone', 'email'];
  employeeTableTitle: string = 'Employees';
  employeeData: any;

  constructor(public employees: StoreService) {}

  ngOnInit(): void {
    this.getEmployeeData();
  }

  ngOnDestroy(): void {
    this.employeeSubscription.unsubscribe();
  }

  getEmployeeData() {
    this.loading = true;

    this.employeeSubscription = this.employees
      .getStoreEmployeeInfo('Georgia')
      .subscribe((data: any) => {
        this.employeeData = Object.keys(data).map((key) => {
          return { ...data[key], id: key };
        });
      });

    this.loading = false;
  }

  deleteEmployee(id: string) {
    this.employees.deleteStoreEmployeeInfo('Georgia', id).subscribe(() => {
      this.getEmployeeData();
    });
  }

  editEmployee(employee: any) {
    this.employees
      .editStoreEmployeeInfo('Georgia', employee.id, employee)
      .subscribe(() => {
        this.getEmployeeData();
      });
  }
}
