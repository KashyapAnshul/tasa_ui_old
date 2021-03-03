import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { SharedService } from '@app/services/shared.service';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss'],
})
export class RightSideComponent implements OnInit {
  newsConfig: any = {
    isFetching: false,
    data: [],
  };
  constructor(public sharedService: SharedService, private credentialsService: CredentialsService) {}

  getNews() {
    this.newsConfig.isFetching = true;
    let apiUrl = this.sharedService.urlService.simpleApiCall('getNews');
    this.sharedService.configService.get(apiUrl).subscribe(
      (response: any) => {
        this.newsConfig.data = response;
        this.newsConfig.isFetching = false;
      },
      (error) => {
        this.newsConfig.isFetching = false;
      }
    );
  }

  ngOnInit(): void {
    this.getNews();
  }

  get user(): any | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials : null;
  }
}
