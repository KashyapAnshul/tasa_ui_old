// TASA Apis
// where G  stands for GET api request
// where PO stands for POST api request
// where PU stands for PUT api request
// where PA stands for PATCH api request
// where D  stands for DELETE api request
export const urls: any = {
  // home

  getNews: '/v1/news', // G
  gePost: '/v1/posts', // G

  // Authentication

  getUsers: '/users', // G
  login: '/v1/login', // PO
  signup: '/v1/signup', // PO
  checkUsername: '/v1/checkUserName/{userName}', // PO
  checkEmail: '/v1/checkEmail/{email}', // PO
  uploadUserImage: '/v1/uploadImage/{email}', // PO
  updatePassword: '/v1/auth/update-password', // PO
  forgotPassword: '/v1/auth/forgot-password/{email}', //PO
  resetPassword: '/v1/auth/reset-password', // PO
  checkCurrentPassword: '/v1/checkPassword/{email}/{currentPassword}', // PO

  // location

  getCountry: '/v1/locations', // G
  getCities: '/v1/locations/{countryCode}/cities', // G

  // Contact us
  contactUs: '/v1/contact-us', // PO

  // course
  getAllCourse: '/v1/courses/all', // G
  getCourseDetails: '/v1/courses/{courseKey}', // G
  getCourse: '/v1/courses/page/{page}/{size}', // G
};
