import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { filter, delay } from 'rxjs/operators';
import { jobsSearchData } from '@app/models/constants';
import { untilDestroyed } from '@app/@core';

// service
import { SharedService } from '@app/services/shared.service';
import { CredentialsService, AuthenticationService } from '@app/auth';

//popups
import { JobsApplyPopupComponent } from '@app/partials/popups/jobs/jobs-apply-popup/jobs-apply-popup.component';

@Component({
  selector: 'app-all-job-listings',
  templateUrl: './all-job-listings.component.html',
  styleUrls: ['./all-job-listings.component.scss'],
})
export class AllJobListingsComponent implements OnInit {
  @ViewChild('filterDrawer', { static: false }) filterDrawer: any;
  uds: any;
  isLoading: boolean = true;
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  filterData: any = {
    tiers: [],
    categories: [],
    levels: ['Introductory', 'Beginner', 'Intermediate', 'Advanced'],
    languages: [],
    subjects: [],
    programs: [],
  };
  isAdmin: boolean = false;
  searchConfig: any = {};
  panelOpenState: boolean = false;
  allJobs: any = [];
  countries: any = [];

  constructor(
    public sharedService: SharedService,
    public router: Router,
    public credentialsService: CredentialsService,
    public authenticationService: AuthenticationService
  ) {
    this.searchConfig = JSON.parse(JSON.stringify(jobsSearchData));
    this.uds = this.sharedService.plugins.undSco;
    this.user && this.user.type.toLowerCase() == 'admin' ? (this.isAdmin = true) : (this.isAdmin = false);
  }

  applyFilter(_pageIndex?: number) {
    let $t = this;
    if ($t.sharedService.deviceDetectorService.isMobile()) {
      $t.filterDrawer.toggle();
    }
    $t.isLoading = true;
    let apiUrl = $t.sharedService.urlService.apiCallWithParams('searchJobs', {
      '{page}': _pageIndex || 1,
      '{size}': this.pageSize,
    });
    $t.sharedService.configService.post(apiUrl, $t.searchConfig).subscribe(
      (response: any) => {
        $t.allJobs = response.responseObj.courses;
        $t.length = response.responseObj.count;
        $t.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkFilter() {
    return Object.values(this.searchConfig).filter((d) => d != '').length;
  }

  removeFilter() {
    this.searchConfig = JSON.parse(JSON.stringify(jobsSearchData));
    this.getJobs(1);
  }

  pagination(event: any): any {
    this.pageSize = event.pageSize;
    if (this.checkFilter()) {
      this.applyFilter(event.pageIndex + 1);
    } else {
      this.getJobs(event.pageIndex + 1);
    }
  }

  selectCourse(event: any, course: any) {
    event.stopPropagation();
    event.preventDefault();
    course['isSelected'] = course['isSelected'] ? !course['isSelected'] : true;
  }

  init() {
    this.getJobs(1);
    this.getCountry();
  }

  get user(): any | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials : null;
  }

  getJobs(_pageIndex: any) {
    this.isLoading = true;
    let apiUrl = this.sharedService.urlService.apiCallWithParams('getAllJobs', {
      '{page}': 1,
      '{size}': this.pageSize,
    });
    this.sharedService.configService.get(apiUrl).subscribe(
      (response: any) => {
        this.allJobs = response.responseObj;
        this.length = response.responseObj.length;
        this.isLoading = false;
        if (!this.sharedService.deviceDetectorService.isMobile()) {
          this.filterDrawer.open();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCountry() {
    let $t = this;
    let apiUrl = $t.sharedService.urlService.simpleApiCall('getCountry');

    $t.sharedService.configService.get(apiUrl).subscribe((response) => {
      $t.countries = response;
    });
  }

  applyForJob(_course: any, _event: any) {
    this.sharedService.dialogService.open(JobsApplyPopupComponent, {
      width: '50%',
      data: {
        applyingForJob: _course,
        user: this.user,
        waitTillSubmit: true,
      },
    });
  }

  ngOnInit(): void {
    this.sharedService.utilityService.requiredStyleForHomeHeader();
    window.scrollTo(0, 0);
    this.init();

    this.sharedService.utilityService.currentMessage.pipe(delay(10), untilDestroyed(this)).subscribe((message) => {
      if (message == 'TRIGGER-COURSE-SEARCH') {
        this.init();
      }
    });
  }
  ngOnDestroy(): void {}
}
