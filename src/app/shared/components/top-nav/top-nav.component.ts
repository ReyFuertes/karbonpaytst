import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Input() public topNavName: string = '';
  @Input() public topNavBgColor: string = '#5f97f2';
  @Input() public topNavIcon: string = 'plus';
  @Input() public hasLogo: boolean = false;

  @Input() public minWidth: string = '610px';
  @Input() public marginLeft: string = '-665px';
  @Input() public hasStatus: boolean = false;
  @Input() public hasInvite: boolean = false;
  @Input() public hasStarted: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  public gotoDashboard(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
