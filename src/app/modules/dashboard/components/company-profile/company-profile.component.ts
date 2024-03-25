import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IOptionValue } from 'src/app/models/app.model';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  public topNavName: string = 'Company Profile';
  public topNavBgColor: string = '#ff877d';
  public topNavIcon: string = 'building';
  public form: FormGroup;
  public primaryContact: Array<IOptionValue> = [{ label: 'None', value: 'None' }];
  public menus: Array<IOptionValue> = [{
    label: 'Basics',
    value: '1',
    isActive: false
  }, {
    label: 'Address',
    value: '2',
    isActive: false
  }, {
    label: 'Offices',
    value: '3',
    isActive: false
  }, {
    label: 'Tools',
    value: '4',
    isActive: false
  }];
  public overviewMenus: Array<IOptionValue> = [{
    label: 'Overview',
    value: '1',
    isActive: false
  }, {
    label: 'Tools',
    value: '2',
    isActive: false
  }, {
    label: 'Files',
    value: '3',
    isActive: false
  }, {
    label: 'Policies',
    value: '4',
    isActive: false
  }, {
    label: 'Settings',
    value: '6',
    isActive: false
  }];
  public activeCompanyMenu = new Map<string, boolean>();
  public countries: Array<IOptionValue> = [{
    label: '',
    value: ''
  }, {
    label: 'Philippines',
    value: 'PH'
  }, {
    label: 'Australia',
    value: 'AU'
  }];
  public showOfficeDialog: boolean = false;
  public officeNameModel: string | undefined;
  public officeAddressModel: string | undefined;
  public isOverview: boolean = false;

  constructor(public fb: FormBuilder, private router: Router) {
    this.form = new FormGroup({
      basics: this.fb.group({
        companyName: new FormControl('', [Validators.required]),
        aboutCompany: new FormControl(''),
        primaryContact: new FormControl(''),
      }),
      address: this.fb.group({
        addressLine1: new FormControl('', [Validators.required]),
        addressLine2: new FormControl(''),
        county: new FormControl(''),
        city: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        postCode: new FormControl('', [Validators.required])
      }),
      offices: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    const companyPersistKey = localStorage.getItem('activeCompanyMenu');
    if (companyPersistKey) {
      const key = JSON.parse(companyPersistKey);
      this.goto(key);
    } else {
      this.goto('1');
    }
    const companyProfileValues = localStorage.getItem('companyProfile');
    if (companyProfileValues) {
      const companyProfile = JSON.parse(companyProfileValues);
      this.form.patchValue(companyProfile);
      companyProfile.offices.forEach((office: any) => {
        this.getOffices.push(this.fb.group({
          officeName: office.officeName,
          address: office.address
        }));
      });
    };
  }

  public onSaveContinue(): void {
    if(this.form.value) {
      localStorage.setItem('companyProfile', JSON.stringify(this.form.value));
    };
    this.goto(this.menus[3].value as string);
  }

  public get getOffices(): FormArray {
    return this.form.get("offices") as FormArray;
  }

  public addOffice(): void {
    if (this.officeNameModel) {
      this.getOffices.push(this.fb.group({
        officeName: this.officeNameModel,
        address: this.officeAddressModel
      }));
    };
    this.toggleOfficeDialog();
    this.officeNameModel = '';
    this.officeAddressModel = '';
  }

  public toggleOfficeDialog(): void {
    this.showOfficeDialog = !this.showOfficeDialog;
  }

  public isValid(name: string): boolean | undefined {
    return this.form?.get(name.toLowerCase())?.valid;
  }

  public gotoAddress(): void {
    this.goto(this.menus[1].value as string);
  }

  public gotoBasics(): void {
    this.goto(this.menus[0].value as string);
  }

  public gotoOffices(): void {
    this.goto(this.menus[2].value as string);
  }

  public skipForNowTools(): void {
    this.isOverview = !this.isOverview;
  }

  public goto(key: string): void {
    this.activeCompanyMenu.clear();
    this.activeCompanyMenu.set(key as string, true);
    localStorage.setItem('activeCompanyMenu', JSON.stringify(key))
  }

  public back(): void {
    this.router.navigateByUrl('/dashboard');
    localStorage.removeItem('companyProfile');
    localStorage.removeItem('activeCompanyMenu');
  }

  public getActiveMenu(key: string | undefined): boolean | undefined {
    return this.activeCompanyMenu.get(key as string);
  }
}
