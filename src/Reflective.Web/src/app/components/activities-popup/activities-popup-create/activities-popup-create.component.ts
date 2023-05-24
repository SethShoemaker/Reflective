import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Component({
  selector: 'app-activities-popup-create',
  templateUrl: './activities-popup-create.component.html',
  styleUrls: ['./activities-popup-create.component.scss']
})
export class ActivitiesPopupCreateComponent implements OnInit {
  name: string = "";
  nameIsValid: boolean = true;
  description: string = "";
  descriptionIsValid: boolean = true;

  constructor(
    private router: Router,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {}
  
  cancel() {
    this.router.navigateByUrl("/activities");
  }

  submit() {
    if (this.name.length == 0 || this.name.length > 10)
      this.nameIsValid = false;

    if (this.description.length > 55)
      this.descriptionIsValid = false;

    if (!this.nameIsValid || !this.descriptionIsValid)
      return;
    
    const observer = {
      next: () => this.router.navigateByUrl("/activities")
    };

    this.activityService.create(this.name, this.description).subscribe(observer);
  }
}
