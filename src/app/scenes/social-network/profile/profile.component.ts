import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@app/@core';
import { delay } from 'rxjs/operators';

//service
import { SocialnetworkService } from '../socialnetwork.service';
import { CredentialsService } from '@app/auth';
import { SharedService } from '@app/services/shared.service';

// component
import { CreateGroupPopupComponent } from '@app/partials/popups/group/create-group-popup/create-group-popup.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  @ViewChild('conectionDrawer', { static: false }) conectionDrawer: any;
  public userConfig: any = {
    fetchingUser: false,
    user: {},
    tasaId: '',
    isConnected: false,
  };
  isCurrentUser: boolean = true;
  mom: any;

  constructor(
    public credentialsService: CredentialsService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private socialnetworkService: SocialnetworkService
  ) {
    this.sharedService.utilityService.changeMessage('FETCH-USER-PROFILE');
    this.mom = this.sharedService.plugins.mom;
  }

  get user(): any | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials : null;
  }

  getDate(_dateToFormat: any) {
    return this.mom(_dateToFormat).format('YYYY-MM-DD');
  }

  fetchUser() {
    let $t = this;
    $t.userConfig.tasaId = $t.route.snapshot.params.tasaId;
    $t.userConfig.fetchingUser = true;
    let apiUrl = $t.sharedService.urlService.apiCallWithParams('getUserById', {
      '{tasaId}': $t.userConfig.tasaId,
    });
    $t.sharedService.configService.get(apiUrl).subscribe(
      (response: any) => {
      $t.userConfig.user = response.responseObj;
        $t.userConfig.user.tasaId != $t.user.tasaId ? ($t.isCurrentUser = false) : ($t.isCurrentUser = true);
        if (!$t.isCurrentUser) {
          $t.fetchConnections();
        } else {
          $t.userConfig.fetchingUser = false;
        }
      },
      (error) => {
        $t.userConfig.fetchingUser = false;
      }
    );
  }

  fetchConnections() {
    this.userConfig.isConnected = false;
    this.socialnetworkService.getAllConnections().subscribe(
      (response: any) => {
        if (response && response.connections) {
          if (response.connections.filter((d: any) => d.tasaId === this.userConfig.tasaId).length) {
            this.userConfig.isConnected = true;
          } else {
            this.userConfig.isConnected = false;
          }
        }
        this.userConfig.fetchingUser = false;
      },
      (error) => {
        this.userConfig.isConnected = false;
        this.userConfig.fetchingUser = false;
        this.sharedService.uiService.showApiErrorPopMsg(error.error.message);
      }
    );
  }

  openCreateGroupPopup() {
    this.sharedService.dialogService.open(CreateGroupPopupComponent, {
      width: '450px',
      data: { authenticationService: this, credentialsService: this.credentialsService, user: this.user },
      disableClose: false,
    });
  }

  ngOnInit(): void {
    if (!this.user.image || this.user.image == 'string') {
      this.user.image = 'https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg';
    }
    this.sharedService.utilityService.currentMessage.pipe(delay(10), untilDestroyed(this)).subscribe((message) => {
      if (message === 'FETCH-USER-PROFILE') {
        this.fetchUser();
      }
    });
  }

  connect() {
    let $t = this;
    $t.sharedService.uiService.showApiStartPopMsg('Sending Request...!');
    let apiUrl = $t.sharedService.urlService.apiCallWithParams('sendNetworkConnectionRequest', {
      '{fromUserId}': $t.user.email,
      '{toUserId}': $t.userConfig.user.email,
    });
    $t.sharedService.configService.post(apiUrl).subscribe(
      (response: any) => {
        $t.sharedService.uiService.showApiSuccessPopMsg('Request Send...!');
      },
      (error) => {
        $t.sharedService.uiService.showApiErrorPopMsg(error.error.message);
      }
    );
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {}
}
