import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAppItem } from 'src/app/models/app.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DasboardComponent implements OnInit {
  public topNavName: string = 'Dashboard';
  public people: Array<{ name: string, value: string }>;
  public apps: Array<IAppItem>;
  public activeApps = new Map<string, IAppItem>();
  public companyProfile: any;

  constructor(private router: Router) {
    this.people = [{
      name: 'Darren',
      value: 'DB'
    }];
    this.apps = [{
      name: 'People',
      icon: 'users',
      value: '0'
    }, {
      name: 'Company Profile',
      icon: 'building',
      value: '1'
    }, {
      name: 'Time Off',
      icon: 'calendar',
      value: '2'
    }, {
      name: 'Expenses',
      icon: 'wallet',
      value: '3'
    }]
    this.activeApps.set('0', { active: true, color: '#32b65e' });
  }

  ngOnInit(): void {
    const localStoragePeople = localStorage.getItem('people');
    if (localStoragePeople) {
      const people: any[] = JSON.parse(localStoragePeople);
      people.forEach(({ basics }) => {
        this.people.push({
          name: `${basics?.firstName} ${basics?.lastName}`,
          value: `${basics?.firstName?.substring(0, 1)}${basics?.lastName?.substring(0, 1)}`
        })
      });
    };
    const companyProfile = localStorage.getItem('companyProfile');
    if (companyProfile) {
      this.companyProfile = JSON.parse(companyProfile);
      this.activeApps.set('1', { active: true, color: '#ff877d' })
    }
  }

  public isAppActive(key: string) {
    return this.activeApps.get(key)?.active === true
      ? this.activeApps.get(key)?.color
      : ''
  }

  public gotoAdd(): void {
    this.router.navigateByUrl('employee/add');
    localStorage.removeItem('employeeDetails');
    localStorage.removeItem('activeEmpMenu');
  }

  public gotoApp(app: IAppItem): void {
    let url: string = '';
    switch (app.name) {
      case 'People':
        break;
      case 'Company Profile':
        url = 'dashboard/company-profile';
        localStorage.removeItem('activeCompanyMenu');
        break;
      default: break;
    }
    this.router.navigateByUrl(url);
  }
}
