import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { IOptionValue } from 'src/app/models/app.model';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  public topNavName: string = 'Add Employee';
  public topNavBgColor: string = '#50c768';
  public topNavIcon: string = 'users';
  public menus: Array<IOptionValue> = [{
    label: 'Basics',
    value: '1',
    isActive: false
  }, {
    label: 'Job_Details',
    value: '2',
    isActive: false
  }, {
    label: 'Salary',
    value: '3',
    isActive: false
  }];
  public activeMenu = new Map<string, boolean>();
  public form: FormGroup;
  public employmentType: Array<IOptionValue> = [{
    label: 'Full-Time',
    value: 'Full-Time'
  }, {
    label: 'Part-Time',
    value: 'Part-Time'
  }];
  public managers: Array<IOptionValue> = [{ label: 'None', value: 'None' }];
  public teams: Array<IOptionValue> = [{ label: '0 Team Assigned', value: '0' }];
  public offices: Array<IOptionValue> = [{ label: '0 Offices Assigned', value: '0' }];
  public currencies: Array<IOptionValue> = [
    { label: '', value: '' },
    { label: 'GBP - British Pount', value: 'gbp' },
    { label: 'PHP - Phil Peso', value: 'php' }];
  public frequencies: Array<IOptionValue> = [
    { label: '', value: '' },
    { label: 'Annually', value: '12' },
    { label: 'Bi-annually', value: '6' }];

  constructor(public fb: FormBuilder, private router: Router, private messageService: MessageService) {
    this.form = new FormGroup({
      basics: this.fb.group({
        firstName: new FormControl(undefined, [Validators.required]),
        lastName: new FormControl(undefined, [Validators.required]),
        email: new FormControl(undefined),
      }),
      job_details: this.fb.group({
        startDate: new FormControl(undefined, [Validators.required]),
        employmentType: new FormControl(undefined),
        jobTitle: new FormControl(undefined),
        manager: new FormControl(undefined),
        team: new FormControl(undefined),
        office: new FormControl(undefined)
      }),
      salary: this.fb.group({
        amount: new FormControl(undefined, [Validators.required]),
        currency: new FormControl(undefined, [Validators.required]),
        frequency: new FormControl(undefined, [Validators.required]),
        effectiveForm: new FormControl(new Date()),
        note: new FormControl(undefined)
      }),
    });
  }

  ngOnInit(): void {
    const empActiveMenuKey = localStorage.getItem('activeEmpMenu');
    if (empActiveMenuKey) {
      const key = JSON.parse(empActiveMenuKey);
      this.goto(key);
    } else {
      this.goto('1');
    };
    const employeeDetailValues = localStorage.getItem('employeeDetails');
    if (employeeDetailValues) {
      const values = JSON.parse(employeeDetailValues);
      this.form.patchValue(values);

      for (const field in this.form.controls) {
        const control = this.form.get(field);
        if (field === 'job_details') {
          control?.get('startDate')?.patchValue(new Date(control?.get('startDate')?.value));
        }
        if (field === 'salary') {
          control?.get('effectiveForm')?.patchValue(new Date(control?.get('effectiveForm')?.value));
        }
      }
    };
  }

  public isValid(name: string): boolean | undefined {
    return this.form?.get(name.toLowerCase())?.valid;
  }

  public gotoBasics(): void {
    this.goto(this.menus[0].value as string);
  }

  public gotoJobDetails(): void {
    this.goto(this.menus[1].value as string);
    this.saveFormValues();
  }

  public gotoSalary(): void {
    this.goto(this.menus[2].value as string);
    this.saveFormValues();
  }

  public finishLater(): void {
    this.router.navigateByUrl('/dashboard');
    this.saveFormValues();
    localStorage.removeItem('activeEmpMenu');
  }

  public gotoEmpOverview(): void {
    this.saveFormValues();
    this.messageService.add({severity:'warn', summary:'', 
      detail:'Demo has been invited. Well let you know when Demo signs in.'});
    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
    }, 1000);
    const localStoragePeople = localStorage.getItem('people');
    if (localStoragePeople) {
      const people: any[] = JSON.parse(localStoragePeople);
      if (people) {
        people.push(this.form.value);
        localStorage.setItem('people', JSON.stringify(people));
      }
    } else {
      localStorage.setItem('people', JSON.stringify([this.form.value]));
    }
  }

  public goto(key: string): void {
    this.activeMenu.clear();
    this.activeMenu.set(key as string, true);
    localStorage.setItem('activeEmpMenu', JSON.stringify(key))
  }

  public getActiveMenu(key: string | undefined): boolean | undefined {
    return this.activeMenu.get(key as string);
  }

  private saveFormValues(): void {
    if (this.form.value) {
      localStorage.setItem('employeeDetails', JSON.stringify(this.form.value));
    };
  }
}
