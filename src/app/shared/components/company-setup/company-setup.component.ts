import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.scss']
})
export class CompanySetupComponent implements OnInit {
  public initSetupCompany: boolean | undefined;
  public numOfEmps: Array<{ label: string, value: string }> = [{
    label: '1 - 5',
    value: '1'
  }, {
    label: '5 - 20',
    value: '2'
  }];
  public selectedNumOfEmp: { label: string, value: string } | undefined
  public form: FormGroup;

  constructor(public fb: FormBuilder, private router: Router) {
    this.form = new FormGroup({
      companyName: new FormControl('', { nonNullable: true }),
      numOfEmp: new FormControl('', { nonNullable: true })
    });
  }

  ngOnInit(): void {
      this.initSetupCompany = false;
  }

  public gotoDashboard(): void {
    this.router.navigateByUrl('dashboard');
  }
}
