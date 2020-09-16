import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { OwlDOMData } from 'ngx-owl-carousel-o/lib/models/owlDOM-data.model';

// services
import { SharedService } from '@app/services/shared.service';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { Router } from '@angular/router';

// extra
declare var $: any;
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  activeSlide: number = 0;
  news: Array<object> = [];
  posts: Array<object> = [];
  menuHidden = true;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  signup() {
    this.authenticationService.openSignupPopup();
  }

  getNews() {
    let apiUrl = this.sharedService.urlService.simpleApiCall('getNews');
    this.sharedService.configService.get(apiUrl).subscribe(
      (response: any) => {
        this.news = response;
        setTimeout(() => {
          this.newsSlider();
        }, 500);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPosts() {
    let apiUrl = this.sharedService.urlService.simpleApiCall('gePost');
    this.sharedService.configService.get(apiUrl).subscribe(
      (response: any) => {
        this.posts = response;
        setTimeout(() => this.testimonialSlider(), 500);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.isLoading = true;
    this.getPosts();
    this.getNews();
  }

  ngAfterViewInit(): void {
    $(document).on(
      'ready',
      (function ($) {
        'use strict';

        /*---------------------------
          SMOOTH SCROLL
      -----------------------------*/
        $('ul#nav li a[href^="#"], a.navbar-brand, a.scrolltotop').on('click', function (event: any) {
          var id = $(this).attr('href');
          var offset = 60;
          var target = $(id).offset().top - offset;
          $('html, body').animate(
            {
              scrollTop: target,
            },
            1500,
            'easeInOutExpo'
          );
          event.preventDefault();
        });

        /*----------------------------
          MOBILE & DROPDOWN MENU
      ------------------------------*/
        $('.stellarnav').stellarNav({
          theme: 'dark',
          breakpoint: 900,
        });

        /*----------------------------
          SCROLL TO TOP
      ------------------------------*/
        $(window).scroll(function () {
          var $totalHeight = $(window).scrollTop();
          var $scrollToTop = $('.scrolltotop');
          if ($totalHeight > 300) {
            $('.scrolltotop').fadeIn();
          } else {
            $('.scrolltotop').fadeOut();
          }

          if ($totalHeight + $(window).height() === $(document).height()) {
            $scrollToTop.css('bottom', '90px');
          } else {
            $scrollToTop.css('bottom', '20px');
          }
        });

        $('#mainmenu-area').sticky({
          topSpacing: 0,
        });

        /*--------------------------
         PARALLAX BACKGROUND
      ----------------------------*/
        // $(window).stellar({
        //   responsive: true,
        //   positionProperty: 'position',
        //   horizontalScrolling: false,
        // });

        /*---------------------------
        HOME SLIDER
    -----------------------------*/
        var $homeSlider = $('.welcome-slider-area');
        $homeSlider.owlCarousel({
          merge: true,
          smartSpeed: 3000,
          loop: true,
          nav: true,
          autoplayHoverPause: true,
          navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
          autoplay: true,
          autoplayTimeout: 3000,
          margin: 0,
          /*animateIn: 'fadeIn',
          animateOut: 'fadeOut',*/
          responsiveClass: true,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 1,
            },
            1000: {
              items: 1,
            },
            1200: {
              items: 1,
            },
          },
        });

        /*------------------------------
          VIDEO POPUP
      --------------------------------*/
        var $videoModal = $('.video-area-popup');
        $videoModal.modalVideo({
          channel: 'youtube',
        });

        /*---------------------------
          COURSE SLIDER
      -----------------------------*/
        var $courseCarousel = $('.course-list');
        $courseCarousel.owlCarousel({
          merge: true,
          smartSpeed: 1000,
          loop: true,
          nav: false,
          center: true,
          autoplayHoverPause: true,
          navText: ['<i class="fa fa-long-arrow-left"></i> Prev', 'Next <i class="fa fa-long-arrow-right"></i>'],
          autoplay: true,
          autoplayTimeout: 3000,
          margin: 10,
          responsiveClass: true,
          responsive: {
            0: {
              items: 1,
              margin: 0,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 3,
            },
            1200: {
              items: 4,
            },
          },
        });

        /*---------------------------
          CLIENT SLIDER
      -----------------------------*/
        var $clientCarousel = $('.client-slider');
        $clientCarousel.owlCarousel({
          merge: true,
          smartSpeed: 1000,
          loop: true,
          nav: false,
          center: true,
          autoplayHoverPause: true,
          navText: ['<i class="fa fa-long-arrow-left"></i> Prev', 'Next <i class="fa fa-long-arrow-right"></i>'],
          autoplay: true,
          autoplayTimeout: 3000,
          margin: 30,
          responsiveClass: true,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 3,
            },
            1200: {
              items: 4,
            },
            1900: {
              items: 5,
            },
          },
        });

        /*--------------------------
          FACT COUNTERING
      ---------------------------*/
        // $('.counter').counterUp({
        //   delay: 10,
        //   time: 1000,
        // });

        /*--------------------------
          ACTIVE WOW JS
      ----------------------------*/
        // new WOW().init();

        /*---------------------------
          PLACEHOLDER ANIMATION
      ----------------------------*/
        // Placeholdem(document.querySelectorAll('[placeholder]'));
      })($)
    );

    $(window).on('load', function () {
      'use strict';
      /*--------------------------
          PRE LOADER
      ----------------------------*/
      $('.preeloader').fadeOut(1000);
    });

    AOS.init();
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.sharedService.uiService.showApiSuccessPopMsg('Logout Successfully...!');
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/home'], { replaceUrl: true }));
  }

  login() {
    this.authenticationService.openLoginPopup();
  }

  userDetails() {
    this.authenticationService.openUserDetailsPopup();
  }

  scrollToFaq(_id: string) {
    this.sharedService.utilityService.scrollToElement(_id);
  }

  get user(): any | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials : null;
  }

  newsSlider() {
    var $newsSlider = $('.news-slider');
    $newsSlider.owlCarousel({
      merge: true,
      smartSpeed: 1000,
      loop: true,
      nav: true,
      center: false,
      dots: false,
      autoplayHoverPause: true,
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      autoplay: false,
      autoplayTimeout: 3000,
      margin: 80,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
  }

  testimonialSlider() {
    var $testmonialCarousel = $('.testmonial-slider');
    $testmonialCarousel.owlCarousel({
      merge: true,
      smartSpeed: 1000,
      loop: true,
      nav: true,
      center: false,
      dots: false,
      autoplayHoverPause: true,
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      autoplay: true,
      autoplayTimeout: 3000,
      margin: 80,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 2,
        },
        1200: {
          items: 2,
        },
      },
    });
  }

  getPassedData(data: SlidesOutputData) {
    this.activeSlide = data.startPosition;
  }
}
