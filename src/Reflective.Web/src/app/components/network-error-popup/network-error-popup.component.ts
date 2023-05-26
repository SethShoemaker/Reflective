import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Constants from 'src/app/constants';
import { HealthCheckService } from 'src/app/services/health-check/health-check.service';

@Component({
  selector: 'app-network-error-popup',
  templateUrl: './network-error-popup.component.html',
  styleUrls: ['./network-error-popup.component.scss']
})
export class NetworkErrorPopupComponent implements OnInit {
  title: string = "Network Error";
  popupIsVisible: boolean = true;

  constructor(
    private healthCheck: HealthCheckService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  retry() {
    this.popupIsVisible = false;
    let returnUrl: string = this.route.snapshot.paramMap.get(Constants.returnUrlParam) ?? "/";

    const observer = {
      next: () => this.router.navigateByUrl(returnUrl),
      error: () => this.popupIsVisible = true
    }

    this.healthCheck.check().subscribe(observer);
  }
}
