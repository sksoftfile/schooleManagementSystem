import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { MaintenanceComponent } from 'src/app/components/maintenance/maintenance.component';

import { SalesBarChartComponent } from 'src/app/components/charts/sales-bar-chart/sales-bar-chart.component';
import { ExpensePieChartComponent } from 'src/app/components/charts/expense-pie-chart/expense-pie-chart.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    PostsComponent,
    MaintenanceComponent,
    SalesBarChartComponent,
    ExpensePieChartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
})
export class MainModule {}
