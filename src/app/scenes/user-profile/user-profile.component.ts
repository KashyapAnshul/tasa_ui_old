import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//service
import { SharedService } from '@app/services/shared.service';
import { Router } from '@angular/router';
import { AuthenticationService, CredentialsService } from '@app/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @ViewChild('uploadCertificate', { static: false }) public upCert: any;
  userDetailsForm: FormGroup;
  personalDetailsForm: FormGroup;
  educationDetailsForm: FormGroup;
  experienceDetailsForm: FormGroup;
  teachingExperienceForm: FormGroup;
  careerPreferenceDetailsForm: FormGroup;
  organizationDetailsForm: FormGroup;
  socialDetailsForm: FormGroup;
  careerOpeningDetailsForm: FormGroup;
  userDetails: any;
  showMandatoryMessage: boolean = false;
  countries: any = [];
  college: any = [];
  university: any = [];
  organisationList: any = [];
  suportedFile: any = ['pdf', 'jpg', 'jpeg', 'png'];

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {
    this.userDetails = JSON.parse(JSON.stringify(this.user));
  }

  suffixes = [
    { code: 'master', label: 'Master' },
    { code: 'miss', label: 'Miss' },
    { code: 'mr', label: 'Mr' },
    { code: 'mrs', label: 'Mrs' },
  ];

  personalDetails = [
    {
      id: 'ein',
      label: 'EIN',
      type: 'text',
      formControlName: 'ein',
      placeholder: 'EIN',
      prepend: 'fas fa-user',
      mandatory: false,
    },
    {
      id: 'suffix',
      label: 'Suffix',
      type: 'text',
      formControlName: 'suffix',
      placeholder: 'Your Preferred Suffix',
      prepend: 'fas fa-user',
      mandatory: false,
    },
    {
      id: 'firName',
      label: 'First Name',
      type: 'text',
      formControlName: 'firstName',
      placeholder: 'Your First Name',
      prepend: 'fas fa-user',
      mandatory: false,
    },
    {
      id: 'midName',
      label: 'Middle Name',
      type: 'text',
      formControlName: 'middleName',
      placeholder: 'Your Middle Name',
      prepend: 'fas fa-user',
      mandatory: false,
    },
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      formControlName: 'lastName',
      placeholder: 'Your Last Name',
      prepend: 'fas fa-user',
      mandatory: false,
    },
    {
      id: 'profileSummary',
      label: 'Summary',
      type: 'text',
      formControlName: 'profileSummary',
      placeholder: 'Your Profile Summary',
      prepend: 'fas fa-user',
      mandatory: true,
    },
    {
      id: 'emailId',
      label: 'Email ID',
      type: 'email',
      formControlName: 'email',
      placeholder: 'Your Email ID',
      prepend: 'fas fa-at',
      mandatory: false,
    },
    {
      id: 'dob',
      label: 'Date Of Birth',
      type: 'date',
      formControlName: 'dob',
      placeholder: 'Your Date Of Birth',
      prepend: 'fas fa-calendar-day',
      mandatory: false,
    },
    {
      id: 'address1',
      label: 'Address 1',
      type: 'text',
      formControlName: 'addressLine1',
      placeholder: 'Your Address',
      prepend: 'far fa-address-card',
      mandatory: true,
    },
    {
      id: 'address2',
      label: 'Address 2',
      type: 'text',
      formControlName: 'addressLine2',
      placeholder: 'Your Address',
      prepend: 'far fa-address-card',
      mandatory: false,
    },
    {
      id: 'country',
      label: 'Country',
      type: 'text',
      formControlName: 'country',
      placeholder: 'Your Country',
      prepend: 'far fa-flag',
      mandatory: true,
    },
    {
      id: 'state',
      label: 'State',
      type: 'text',
      formControlName: 'state',
      placeholder: 'Your State',
      prepend: 'far fa-flag',
      mandatory: true,
    },
    {
      id: 'city',
      label: 'City',
      type: 'text',
      formControlName: 'city',
      placeholder: 'Your City',
      prepend: 'far fa-flag',
      mandatory: true,
    },
    {
      id: 'district',
      label: 'District/Province',
      type: 'text',
      formControlName: 'district',
      placeholder: 'Your District/Province',
      prepend: 'far fa-flag',
      mandatory: false,
    },
    {
      id: 'postalCode',
      label: 'Postal Code',
      type: 'text',
      formControlName: 'postalCode',
      placeholder: 'Your Postal Code',
      prepend: 'far fa-envelope',
      mandatory: true,
    },
    {
      id: 'language',
      label: 'Language',
      type: 'text',
      formControlName: 'language',
      placeholder: 'Your Language',
      prepend: 'fas fa-language',
      mandatory: false,
    },
    {
      id: 'identifier',
      label: 'SSN/Identifier',
      type: 'text',
      formControlName: 'identifier',
      placeholder: 'Your SSN/Identifier',
      prepend: 'far fa-id-badge',
      mandatory: false,
    },
    {
      id: 'bio',
      label: 'Bio',
      type: 'text',
      formControlName: 'bio',
      placeholder: 'Information about yourself, your achievments, your interests, your passions, etc',
      prepend: 'fas fa-info',
      mandatory: false,
    },
    {
      id: 'billingAdd1',
      label: 'Billing Address 1',
      type: 'text',
      formControlName: 'billingAdd1',
      placeholder: 'Your Billing Address',
      prepend: 'far fa-flag',
      mandatory: false,
    },
    {
      id: 'billingAdd2',
      label: 'Billing Address 2',
      type: 'text',
      formControlName: 'billingAdd2',
      placeholder: 'Your Billing Address',
      prepend: 'far fa-flag',
      mandatory: false,
    },
    {
      id: 'billingCity',
      label: 'Billing City',
      type: 'text',
      formControlName: 'billingCity',
      placeholder: 'Your Billing City',
      prepend: 'far fa-flag',
      mandatory: false,
    },
    {
      id: 'billingState',
      label: 'Billing State',
      type: 'text',
      formControlName: 'billingState',
      placeholder: 'Your Billing State',
      prepend: 'far fa-flag',
      mandatory: false,
    },
    {
      id: 'billingPostalCode',
      label: 'Billing Postal Code',
      type: 'text',
      formControlName: 'billingPostalCode',
      placeholder: 'Your Billing Postal Code',
      prepend: 'far fa-flag',
      mandatory: false,
    },
  ];

  userEducation = [
    {
      highestDegree: 'string',
      college: [
        'string'
      ],
      university: [
        'string'
      ],
      major: 'string',
      minor1: 'string',
      minor2: 'string',
      minor3: 'string',
      certificates: 'string'
    }
  ];

  educationDetails = [
    {
      id: 'highestDegree',
      label: 'Highest Degree',
      type: 'text',
      formControlName: 'highestDegree',
      placeholder: 'Your Highest Degree',
      prepend: 'fas fa-graduation-cap w10',
      mandatory: true,
    },
    {
      id: 'college',
      label: 'College',
      type: 'text',
      formControlName: 'college',
      placeholder: 'Your College',
      prepend: 'fas fa-school w10',
      mandatory: true,
    },
    {
      id: 'university',
      label: 'University',
      type: 'text',
      formControlName: 'university',
      placeholder: 'Your University',
      prepend: 'fas fa-university w10',
      mandatory: true,
    },
    {
      id: 'major',
      label: 'Major',
      type: 'text',
      formControlName: 'major',
      placeholder: 'Your Major',
      prepend: 'fas fa-user-graduate w10',
      mandatory: true,
    },
    {
      id: 'minor',
      label: 'Minor',
      type: 'text',
      formControlName: 'minor',
      placeholder: 'Your Minor',
      prepend: 'fas fa-user-graduate w10',
      mandatory: false,
    },
    {
      id: 'certificates',
      label: 'Certificates',
      type: 'text',
      formControlName: 'certificates',
      placeholder: 'Your Certificate',
      prepend: 'fas fa-award w10',
      mandatory: true,
    },
  ];

  userExperience = [
    {
      experience: '',
      currentRole: ['string'],
      project1: ['string'],
      organization: 'string'
    }
  ];

  experienceDetails = [
    {
      id: 'experience',
      label: 'Experience',
      type: 'text',
      formControlName: 'experience',
      placeholder: 'Your Experience',
      prepend: 'fas fa-briefcase',
      mandatory: true,
    },
    {
      id: 'organization',
      label: 'Current Organization',
      type: 'text',
      formControlName: 'organization',
      placeholder: 'Your Current Organization',
      prepend: 'far fa-building',
      mandatory: true,
    },
    {
      id: 'currentRole',
      label: 'Current Role',
      type: 'text',
      formControlName: 'currentRole',
      placeholder: 'Your Current Role',
      prepend: 'fas fa-user-tie',
      mandatory: true,
    },
    {
      id: 'project1',
      label: 'Latest Project Details 1',
      type: 'text',
      formControlName: 'project1',
      placeholder: 'Latest Projects Implemented Details',
      prepend: 'fas fa-project-diagram',
      mandatory: false,
    }
  ];

  teachingExperienceDetails = [
    {
      id: 'teachingExperience',
      label: 'Teaching Experience',
      type: 'text',
      formControlName: 'teachingExperience',
      placeholder: 'Your Teaching Experience',
      prepend: 'fas fa-briefcase',
      mandatory: true,
    },
    {
      id: 'universityTought',
      label: 'University Taught',
      type: 'text',
      formControlName: 'universityTought',
      placeholder: 'Your University Taught',
      prepend: 'far fa-building',
      mandatory: false,
    },
    {
      id: 'collegeTought',
      label: 'collegeTought',
      type: 'text',
      formControlName: 'collegeTought',
      placeholder: 'Your College Taught',
      prepend: 'fas fa-user-tie',
      mandatory: false,
    },
    {
      id: 'specialization',
      label: 'Specialization',
      type: 'text',
      formControlName: 'specialization',
      placeholder: 'Your Specialization',
      prepend: 'fas fa-user-tie',
      mandatory: false,
    },
    {
      id: 'licenseNo',
      label: 'License Number',
      type: 'text',
      formControlName: 'licenseNo',
      placeholder: 'Your License Number',
      prepend: 'fas fa-user-tie',
      mandatory: false,
    },
  ];

  careerPreferenceDetails = [
    {
      id: 'areaOfPreference',
      label: 'Area Of Preference',
      type: 'text',
      formControlName: 'areaOfPreference',
      placeholder: 'Your Area Of Preference',
      prepend: 'fas fa-chalkboard-teacher',
      mandatory: true,
    },
    {
      id: 'preferredRole',
      label: 'Preferred Role',
      type: 'text',
      formControlName: 'preferredRole',
      placeholder: 'Your Preferred Role',
      prepend: 'fas fa-user-tie',
      mandatory: true,
    },
    {
      id: 'careerGoals',
      label: 'Career Goals',
      type: 'text',
      formControlName: 'careerGoals',
      placeholder: 'Your Career Goals',
      prepend: 'fas fa-bullseye',
      mandatory: true,
    },
  ];

  organizationDetails = [
    {
      id: 'organizationName',
      label: 'Organization Name',
      type: 'text',
      formControlName: 'organizationName',
      placeholder: 'Your Organization Name',
      prepend: 'fas fa-sitemap',
      mandatory: true,
    },
    {
      id: 'location',
      label: 'Location',
      type: 'text',
      formControlName: 'location',
      placeholder: 'Your Location',
      prepend: 'far fa-address-card',
      mandatory: true,
    },
    {
      id: 'description',
      label: 'Description',
      type: 'text',
      formControlName: 'description',
      placeholder: 'Your Description',
      prepend: 'far fa-flag',
      mandatory: true,
    },
    {
      id: 'about',
      label: 'About',
      type: 'text',
      formControlName: 'about',
      placeholder: 'Your About',
      prepend: 'far fa-flag',
      mandatory: true,
    },
    {
      id: 'noEmp',
      label: 'Number Of Employees',
      type: 'text',
      formControlName: 'noEmp',
      placeholder: 'Your Numer Of Employees',
      prepend: 'far fa-flag',
      mandatory: true,
    },
    {
      id: 'industry',
      label: 'Industry',
      type: 'text',
      formControlName: 'industry',
      placeholder: 'Your Industry',
      prepend: 'far fa-envelope',
      mandatory: true,
    },
    {
      id: 'team',
      label: 'Team',
      type: 'text',
      formControlName: 'team',
      placeholder: 'Your Team',
      prepend: 'fas fa-users',
      mandatory: false,
    },
  ];

  socialDetails = [
    {
      id: 'contactNo',
      label: 'Contact Number',
      type: 'text',
      formControlName: 'contactNo',
      placeholder: 'Your Contact Number',
      prepend: 'far fa-address-card',
      mandatory: true,
    },
    {
      id: 'contactEmail',
      label: 'Contact Email Address',
      type: 'email',
      formControlName: 'contactEmail',
      placeholder: 'Your Contact Email Address',
      prepend: 'far fa-envelope',
      mandatory: true,
    },
    {
      id: 'website',
      label: 'Website',
      type: 'text',
      formControlName: 'website',
      placeholder: 'Your Website',
      prepend: 'far fa-flag',
      mandatory: true,
    },
    {
      id: 'linkedin',
      label: 'Linkedin',
      type: 'text',
      formControlName: 'linkedin',
      placeholder: 'Your Linkedin',
      prepend: 'far fa-flag',
      mandatory: true,
    },
    {
      id: 'twitter',
      label: 'Twitter',
      type: 'text',
      formControlName: 'twitter',
      placeholder: 'Your Twitter',
      prepend: 'far fa-flag',
      mandatory: true,
    },
  ];

  careerOpeningDetails = [
    {
      id: 'noOfOpenings',
      label: 'Number Of Openings',
      type: 'text',
      formControlName: 'noOfOpenings',
      placeholder: 'Number Of Openings',
      prepend: 'fas fa-briefcase',
      mandatory: false,
    },
    {
      id: 'natureOfOpening',
      label: 'Nature Of Opening',
      type: 'text',
      formControlName: 'natureOfOpening',
      placeholder: 'Nature Of Opening',
      prepend: 'fas fa-briefcase',
      mandatory: false,
    },
    {
      id: 'clients',
      label: 'Clients',
      type: 'text',
      formControlName: 'clients',
      placeholder: 'Your Clients',
      prepend: 'fas fa-users',
      mandatory: false,
    },
    {
      id: 'collaborator',
      label: 'Collaborator',
      type: 'text',
      formControlName: 'collaborator',
      placeholder: 'Your Collaborators',
      prepend: 'fas fa-users',
      mandatory: false,
    },
    {
      id: 'dateOfEstablishment',
      label: 'Date Of Establishment',
      type: 'date',
      formControlName: 'dateOfEstablishment',
      placeholder: 'Date Of Establishment',
      prepend: 'fas fa-calendar-day',
      mandatory: false,
    },
  ];

  initForm(_type: string) {
    switch (_type) {
      case 'Mentor':
        this.personalDetailsForm = this.formBuilder.group({
          suffix: [''],
          firstName: [''],
          middleName: [''],
          lastName: [''],
          email: [''],
          dob: [''],
          addressLine1: ['', [Validators.required]],
          addressLine2: [''],
          country: ['', [Validators.required]],
          state: ['', [Validators.required]],
          city: ['', [Validators.required]],
          district: [''],
          postalCode: ['', [Validators.required]],
          language: [''],
          identifier: [''],
          bio: [''],
          billingAdd1: [''],
          billingAdd2: [''],
          billingCity: [''],
          billingState: [''],
          billingPostalCode: [''],
        });
        this.educationDetailsForm = this.formBuilder.group({
          educationDetailsFA: this.initNewFA('userEducation')
        });
        this.experienceDetailsForm = this.formBuilder.group({
          experienceDetailsFA: this.initNewFA('userExperience')
        });
        this.teachingExperienceForm = this.formBuilder.group({
          teachingExperience: ['', [Validators.required]],
          universityTought: [''],
          collegeTought: [''],
          specialization: [''],
          licenseNo: [''],
        });
        this.careerPreferenceDetailsForm = this.formBuilder.group({
          areaOfPreference: ['', [Validators.required]],
          preferredRole: ['', [Validators.required]],
          careerGoals: ['', [Validators.required]],
        });
        break;
      case 'Recruiter':
        this.organizationDetailsForm = this.formBuilder.group({
          organizationName: [this.user.organizationName, [Validators.required]],
          orgId: [this.user.orgId],
          location: [this.user.location, [Validators.required]],
          description: [this.user.description, [Validators.required]],
          about: [this.user.about, [Validators.required]],
          noEmp: [this.user.noOfEmployee, [Validators.required]],
          industry: [this.user.industry, [Validators.required]],
          team: [''],
        });
        this.socialDetailsForm = this.formBuilder.group({
          contactNo: [this.user.contactNo, [Validators.required]],
          contactEmail: [this.user.contactEmail, [Validators.required]],
          website: [this.user.website, [Validators.required]],
          linkedin: [this.user.linkedIn, [Validators.required]],
          twitter: [this.user.twitter, [Validators.required]],
        });
        this.personalDetailsForm = this.formBuilder.group({
          ein: [''],
          suffix: [''],
          firstName: [this.user.firstName],
          middleName: [''],
          lastName: [this.user.lastName],
          email: [this.user.email],
          dob: [''],
          addressLine1: [this.user.address1, [Validators.required]],
          addressLine2: [''],
          country: [this.user.country, [Validators.required]],
          state: [this.user.state, [Validators.required]],
          city: [this.user.city, [Validators.required]],
          district: [''],
          postalCode: [this.user.postalCode, [Validators.required]],
          language: [''],
          identifier: [''],
          bio: [''],
          billingAdd1: [''],
          billingAdd2: [''],
          billingCity: [''],
          billingState: [''],
          billingPostalCode: [''],
        });
        this.careerOpeningDetailsForm = this.formBuilder.group({
          noOfOpenings: [''],
          natureOfOpening: [''],
          clients: [''],
          collaborator: [''],
          dateOfEstablishment: [''],
        });
        break;
      default:
        this.personalDetailsForm = this.formBuilder.group({
          suffix: [this.user.suffix],
          firstName: [this.user.firstName],
          middleName: [this.user.middleName],
          lastName: [this.user.lastName],
          profileSummary: [this.user.profileSummary],
          email: [this.user.email],
          dob: [this.user.dob],
          addressLine1: [this.user.address1, [Validators.required]],
          addressLine2: [this.user.address2],
          country: [this.user.country, [Validators.required]],
          state: [this.user.state, [Validators.required]],
          city: [this.user.city, [Validators.required]],
          district: [this.user.district],
          postalCode: [this.user.postalCode, [Validators.required]],
          language: [this.user.language],
          identifier: [this.user.identifier],
          bio: [this.user.bio],
          billingAdd1: [this.user.billingAddress1],
          billingAdd2: [this.user.billingAddress2],
          billingCity: [this.user.billingCity],
          billingState: [this.user.billingState],
          billingPostalCode: [this.user.billingPostalCode],
        });
        this.educationDetailsForm = this.formBuilder.group({
          educationDetailsFA: this.initNewFA('userEducation')
        });
        this.experienceDetailsForm = this.formBuilder.group({
          experienceDetailsFA:  this.initNewFA('userExperience')
        });
        this.careerPreferenceDetailsForm = this.formBuilder.group({
          areaOfPreference: [this.user.areaOfPreference, [Validators.required]],
          preferredRole: [this.user.preferredRole, [Validators.required]],
          careerGoals: [this.user.careerGoals, [Validators.required]],
        });
    }
  }

  fc(form: any, _which: string) {
    return form.controls[_which].controls;
  }

  initNewFA(_case: string) {
    const newFA = new FormArray([]);
    if (_case == 'userEducation') {
      newFA.push(this.addEntry('userEducation'));
    } else {
      newFA.push(this.addEntry('userExperience'));
    }
    return newFA;
  }

  addSection(form: any, _which: string, _where: string) {
    let fA = <FormArray>form.controls[_which];
    fA.push(this.addEntry(_where));
  }

  addMore(form: any, _which: string, _index: number, _where: string) {
    console.log(form.controls[_which].controls[_index].controls[_where]);
    let fA = <FormArray>form.controls[_which].controls[_index].controls[_where];
    fA.push(this.formBuilder.group({ name: ['', [Validators.required]]}));
  }

  deleteSection(form: any, _which: string, _index: number) {
    form.controls[_which].removeAt(_index);
  }

  removeMore(form: any, _which: string, _index: number, _where: string, _elInd: number) {
    form.controls[_which].controls[_index].controls[_where].removeAt(_elInd);
  }

  addEntry(_case: string) {
    if (_case == 'userEducation') {
      return this.formBuilder.group({
         highestDegree: ['', Validators.required],
         college: this.initFA('userEducation', 'college'),
         university: this.initFA('userEducation', 'university'),
         major: ['', Validators.required],
         minor: this.initFA('userEducation', 'minor'),
         certificateType: [''],
         certificates: ['', Validators.required]
      });
    } else {
      return this.formBuilder.group({
        experience: ['', Validators.required],
        currentRole: ['', Validators.required],
        organization: ['', Validators.required],
        project1: this.initFA( 'userExperience', 'project1'),
      });
    }
  }

  initFA(_case: string, _arrName: string) {
    const newFA = new FormArray([]);
    this.user[_case] = [];
    this.user[_case][_arrName] = [];
    if (this.user[_case] != null && this.user[_case][_arrName].length != 0) {
      _arrName == 'minor' || _arrName == 'project1'
        ? this.user[_case][_arrName].forEach((d: any) => {
            newFA.push(this.formBuilder.group({ name: [d] }));
          })
        : this.user[_case][_arrName].forEach((d: any) => {
          newFA.push(this.formBuilder.group({ name: [d, [Validators.required]] }));
        })
    } else {
      _arrName == 'minor' || _arrName == 'project1'
        ? newFA.push(this.formBuilder.group({ name: [''] }))
        : newFA.push(this.formBuilder.group({ name: ['', [Validators.required]] }));
    }
    return newFA;
    // return this.formBuilder.group(this.user[_arrName].map((arr: any) => {return arr}), [Validators.required]) as FormArray;
  }

  getCountry() {
    let $t = this;
    let apiUrl = $t.sharedService.urlService.simpleApiCall('getCountry');
    $t.sharedService.configService.get(apiUrl).subscribe((response) => {
      $t.countries = response;
      $t.initForm(this.user.type);
    });
  }

  onObjSubmit(_type: string) {
    let $t = this;
    $t.sharedService.uiService.showApiStartPopMsg('Editing Details...');
    let apiUrl = $t.sharedService.urlService.simpleApiCall('getUsers');
    $t.setUserDetailsObjValues(_type);
    $t.sharedService.configService.put(apiUrl, $t.userDetails).subscribe(
      (response: any) => {
        $t.authenticationService.login(response);
        $t.sharedService.uiService.showApiSuccessPopMsg('Profile Updated Successfully...');
      },
      (error: any) => {
        $t.sharedService.uiService.showApiErrorPopMsg(error.error.message);
      }
    );
  }

  onOrgChange(data: any) {
    console.log(data);
    this.organizationDetailsForm.get('orgId').patchValue(data.id);
  }

  setUserDetailsObjValues(_type: string) {
    let $t = this;
    let personalDetailsValues = $t.personalDetailsForm.value;
    // $t.userDetails.type = personalDetailsValues.type;
    $t.userDetails.suffix = personalDetailsValues.suffix;
    $t.userDetails.firstName = personalDetailsValues.firstName;
    $t.userDetails.middleName = personalDetailsValues.middleName;
    $t.userDetails.profileSummary = personalDetailsValues.profileSummary;
    $t.userDetails.lastName = personalDetailsValues.lastName;
    $t.userDetails.email = personalDetailsValues.email;
    $t.userDetails.dob = personalDetailsValues.dob;
    $t.userDetails.address1 = personalDetailsValues.addressLine1;
    $t.userDetails.address2 = personalDetailsValues.addressLine2;
    $t.userDetails.country = personalDetailsValues.country;
    $t.userDetails.state = personalDetailsValues.state;
    $t.userDetails.city = personalDetailsValues.city;
    $t.userDetails.district = personalDetailsValues.district;
    $t.userDetails.postalCode = personalDetailsValues.postalCode;
    $t.userDetails.language = personalDetailsValues.language;
    $t.userDetails.identifier = personalDetailsValues.identifier;
    $t.userDetails.bio = personalDetailsValues.bio;
    $t.userDetails.billingAddress1 = personalDetailsValues.billingAdd1;
    $t.userDetails.billingAddress2 = personalDetailsValues.billingAdd2;
    $t.userDetails.billingCity = personalDetailsValues.billingCity;
    $t.userDetails.billingState = personalDetailsValues.billingState;
    $t.userDetails.billingPostalCode = personalDetailsValues.billingPostalCode;
    if (_type != 'Recruiter') {
      let educationDetailsValues = $t.educationDetailsForm.value.educationDetailsFA;
      $t.userDetails.userEducation = [];
      educationDetailsValues.forEach((x: any, i: number) => {
        $t.userDetails.userEducation.push(JSON.parse(JSON.stringify(x)));
        $t.userDetails.userEducation[i].college = x.college.map((d: any) => d.name);
        $t.userDetails.userEducation[i].university = x.university.map((d: any) => d.name);
        $t.userDetails.userEducation[i].minor = x.minor.map((d: any) => d.name);
      });
      let experienceDetailsValues = $t.experienceDetailsForm.value.experienceDetailsFA;
      $t.userDetails.userExperience = [];
      experienceDetailsValues.forEach((x: any, i: number) => {
        $t.userDetails.userExperience.push(JSON.parse(JSON.stringify(x)));
        $t.userDetails.userExperience[i].currentRole = [];
        $t.userDetails.userExperience[i].currentRole.push(x.currentRole);
      });
      let careerPreferenceDetailsValues = $t.careerPreferenceDetailsForm.value;
      $t.userDetails.areaOfPreference = careerPreferenceDetailsValues.areaOfPreference;
      $t.userDetails.preferredRole = careerPreferenceDetailsValues.preferredRole;
      $t.userDetails.careerGoals = careerPreferenceDetailsValues.careerGoals;
    }
    if (_type == 'Mentor') {
      let teachingExperienceValues = $t.teachingExperienceForm.value;
      $t.userDetails.teachingExperience = teachingExperienceValues.teachingExperience;
      $t.userDetails.univTought = teachingExperienceValues.universityTought;
      $t.userDetails.collegeTaught = teachingExperienceValues.collegeTaught;
      $t.userDetails.specialization = teachingExperienceValues.specialization;
      $t.userDetails.licenseNo = teachingExperienceValues.licenseNo;
    }
    if (_type == 'Recruiter') {
      let organizationDetailsValues = $t.organizationDetailsForm.value;
      $t.userDetails.noOfEmployee = organizationDetailsValues.noEmp;
      $t.userDetails.orgId = organizationDetailsValues.orgId;
      $t.userDetails.organizationName = organizationDetailsValues.organizationName;
      $t.userDetails.location = organizationDetailsValues.location;
      $t.userDetails.description = organizationDetailsValues.description;
      $t.userDetails.about = organizationDetailsValues.about;
      $t.userDetails.noEmp = organizationDetailsValues.noEmp;
      $t.userDetails.industry = organizationDetailsValues.industry;
      $t.userDetails.team = organizationDetailsValues.team;
      let socialDetailsValues = $t.socialDetailsForm.value;
      $t.userDetails.contactNo = socialDetailsValues.contactNo;
      $t.userDetails.contactEmail = socialDetailsValues.contactEmail;
      $t.userDetails.website = socialDetailsValues.website;
      $t.userDetails.linkedIn = socialDetailsValues.linkedin;
      $t.userDetails.twitter = socialDetailsValues.twitter;
      let careerOpeningDetailsValues = $t.careerOpeningDetailsForm.value;
      $t.userDetails.noOfOpenings = careerOpeningDetailsValues.noOfOpenings;
      $t.userDetails.natureOfOpening = careerOpeningDetailsValues.natureOfOpening;
      $t.userDetails.clients = careerOpeningDetailsValues.clients;
      $t.userDetails.collaborator = careerOpeningDetailsValues.collaborator;
      $t.userDetails.dateOfEstablishment = careerOpeningDetailsValues.dateOfEstablishment;
    }
  }

  triggerUpload() {
    this.upCert.nativeElement.click();
  }

  uploadFile(_event: any, _index: number) {
    // if (Extension == 'pdf' || Extension == 'png' || Extension == 'jpeg' || Extension == 'jpg') {
    let $t = this;
    let apiUrl = $t.sharedService.urlService.apiCallWithParams('uploadSingle', { '{email}': $t.user.email });
    let files = _event.target.files;
    var form = new FormData();
    form.append('file', files[0], files[0].name);
    if ($t.sharedService.utilityService.ValidateCertificateUpload(files[0].name).result) {
      $t.sharedService.uiService.showApiStartPopMsg('Uploading Certificate...');
      $t.sharedService.configService.post(apiUrl, form).subscribe(
        (response: any) => {
          $t.educationDetailsForm.controls['educationDetailsFA']['controls'][_index].controls.certificates.patchValue(response.url);
          $t.educationDetailsForm.controls['educationDetailsFA']['controls'][_index].controls.certificateType.patchValue($t.sharedService.utilityService.ValidateCertificateUpload(files[0].name).type);
          $t.sharedService.uiService.showApiSuccessPopMsg('Certificate Uploaded...');
        },
        (error) => {
          $t.sharedService.uiService.showApiErrorPopMsg('Something Went Wrong, Please Try Again After Sometime...');
        }
      );
    } else {
      $t.sharedService.uiService.showApiErrorPopMsg('Please select a valid file.');
    }
  }

  getFA(form: any, _which: string, _index: number,_controlName: string) {
    return form.controls[_which].controls[_index].controls[_controlName].controls;
  }

  submitDetails(_type: string) {
    let $t = this;
    switch (_type) {
      case 'Mentor':
        if (
          $t.personalDetailsForm.invalid ||
          $t.educationDetailsForm.invalid ||
          $t.experienceDetailsForm.invalid ||
          $t.teachingExperienceForm.invalid ||
          $t.careerPreferenceDetailsForm.invalid
        ) {
          $t.showMandatoryMessage = true;
          return;
        } else {
          $t.showMandatoryMessage = false;
          $t.onObjSubmit(_type);
        }
        break;
      case 'Mentee':
        if (
          $t.personalDetailsForm.invalid ||
          $t.educationDetailsForm.invalid ||
          $t.experienceDetailsForm.invalid ||
          $t.careerPreferenceDetailsForm.invalid
        ) {
          $t.showMandatoryMessage = true;
          return;
        } else {
          $t.showMandatoryMessage = false;
          $t.onObjSubmit(_type);
        }
        break;
      case 'Recruiter':
        if (
          $t.personalDetailsForm.invalid ||
          $t.organizationDetailsForm.invalid ||
          $t.socialDetailsForm.invalid ||
          $t.careerOpeningDetailsForm.invalid
        ) {
          $t.showMandatoryMessage = true;
          return;
        } else {
          $t.showMandatoryMessage = false;
          $t.onObjSubmit(_type);
        }
        break;
    }
  }

  getOrganisation() {
    let $t = this;
    let apiUrl = $t.sharedService.urlService.simpleApiCall('getActiveOrganization');
    $t.sharedService.configService.get(apiUrl).subscribe(
      (response: any) => {
        $t.organisationList = response.responseObj;
      },
      (error: any) => {
        $t.sharedService.uiService.showApiErrorPopMsg(error.error.message);
      }
    );
  }

  get user(): any | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials : null;
  }

  ngOnInit(): void {
    console.log(this.user);
    window.scrollTo(0, 0);
    this.getCountry();
    this.getOrganisation();
  }
}
