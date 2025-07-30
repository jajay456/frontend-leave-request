import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { utils, write, writeFile } from 'xlsx';
import { saveAs } from 'file-saver';


export interface LeaveReport {
  username: string;
  department: string;
  total: number;
  [key: string]: any;
}

@Component({
  selector: 'app-leave-balance-display-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgChartsModule
  ],
  templateUrl: './leave-balance-display-component.component.html',
  styleUrls: ['./leave-balance-display-component.component.scss']
})
export class LeaveBalanceDisplayComponentComponent implements OnInit {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  isBrowser = false;
  reports: LeaveReport[] = [];
  selectedMonthYear = new Date().toISOString().substring(0, 7);
  selectedDepartment: string = 'ทุกแผนก';

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        font: {
          family: 'Kanit',
          size: 18
        }
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          font: { family: 'Kanit' },
        },
        grid: {
          color: '#ddd',
        }
      },
      y: {
        ticks: {
          font: { family: 'Kanit' },

        },
        grid: {
          color: '#ddd',
        }
      }
    }
  };


  barChartLabels: string[] = [];
  barChartData: number[] = [];


  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.onSearch();
    }
  }

  onSearch(): void {
    const [year, month] = this.selectedMonthYear.split('-').map(Number);
    this.fetchReport(month, year, this.selectedDepartment?.trim());
  }

  fetchReport(month: number, year: number, department?: string): void {
    let params = new HttpParams()
      .set('month', month.toString().padStart(2, '0'))
      .set('year', year.toString());

    if (department && department !== 'ทุกแผนก') {
      params = params.set('department', department);
    }

    this.http.get<LeaveReport[]>('http://localhost:8080/api/leave-report', { params })
      .subscribe({
        next: (data) => {
          this.reports = data;
          this.updateChart(data);
        },
        error: (err) => console.error('Error fetching report', err)
      });
  }

  updateChart(data: LeaveReport[]) {
    const totalByType = {
      'ลาป่วย': 0,
      'ลาพักร้อน': 0,
      'ลากิจ': 0
    };

    data.forEach(report => {
      totalByType['ลาป่วย'] += report['ลาป่วย'] || 0;
      totalByType['ลาพักร้อน'] += report['ลาพักร้อน'] || 0;
      totalByType['ลากิจ'] += report['ลากิจ'] || 0;
    });

    this.barChartLabels = Object.keys(totalByType);
    this.barChartData = Object.values(totalByType);
  }

  exportToExcel(): void {
  const worksheet = utils.json_to_sheet(this.reports.map((r) => ({
    ชื่อ: r.username,
    แผนก: r.department,
    ลาป่วย: r['ลาป่วย'] || 0,
    ลาพักร้อน: r['ลาพักร้อน'] || 0,
    ลากิจ: r['ลากิจ'] || 0,
    รวม: r.total
  })));

  const workbook = {
    Sheets: { 'สถิติการลา': worksheet },
    SheetNames: ['สถิติการลา']
  };

  const excelBuffer: any = write(workbook, { bookType: 'xlsx', type: 'array' });
  const file = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  saveAs(file, `รายงานการลา_${this.selectedMonthYear}.xlsx`);
}

}
