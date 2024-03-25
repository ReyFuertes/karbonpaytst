import { Component, OnInit } from '@angular/core';
import { IOptionValue } from 'src/app/models/app.model';

@Component({
  selector: 'app-employee-overview',
  templateUrl: './employee-overview.component.html',
  styleUrls: ['./employee-overview.component.scss']
})
export class EmployeeOverviewComponent implements OnInit {
  public topNavName: string = 'Demo Employee';
  public topNavBgColor: string = '#50c768';
  public topNavIcon: string = 'users';
  public activeMenu = new Map<string, boolean>();
  public menus: Array<IOptionValue> = [{
    label: 'Personal Info',
    value: '1',
    isActive: false
  }, {
    label: 'Job Details',
    value: '2',
    isActive: false
  }, {
    label: 'Payroll',
    value: '3',
    isActive: false
  }, {
    label: 'Files',
    value: '4',
    isActive: false
  }];

  constructor() { }

  ngOnInit(): void {
    const empActiveMenuKey = localStorage.getItem('activeEmpOverviewMenu');
    if (empActiveMenuKey) {
      const key = JSON.parse(empActiveMenuKey);
      this.goto(key);
    } else {
      this.goto('1');
    };
  }

  public goto(key: string): void {
    this.activeMenu.clear();
    this.activeMenu.set(key as string, true);
    localStorage.setItem('activeEmpOverviewMenu', JSON.stringify(key))
  }

  public getActiveMenu(key: string | undefined): boolean | undefined {
    return this.activeMenu.get(key as string);
  }
}
