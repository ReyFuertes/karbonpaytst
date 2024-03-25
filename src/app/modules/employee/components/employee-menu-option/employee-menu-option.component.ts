import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOptionValue } from 'src/app/models/app.model';

@Component({
  selector: 'app-employee-menu-option',
  templateUrl: './employee-menu-option.component.html',
  styleUrls: ['./employee-menu-option.component.scss']
})
export class EmployeeMenuOptionComponent implements OnInit {
  public topNavName: string = 'Add Employee';
  public topNavBgColor: string = '#50c768';
  public topNavIcon: string = 'users';

  public options: Array<IOptionValue> = [{
    label: 'Add employee with details',
    value: 'Add job details and other information',
    icon: 'pi-user-plus',
    action: () => {
      this.router.navigateByUrl('employee/add');
    }
  }, {
    label: 'Quick add and invite',
    value: 'Just add their name and then invite them to air',
    icon: 'pi-send'
  }, {
    label: 'Bulk import from spreadsheet',
    value: 'Add your entire team and their details',
    icon: 'pi-download'
  }];

  constructor(private router: Router) { }

  ngOnInit(): void { }
}
