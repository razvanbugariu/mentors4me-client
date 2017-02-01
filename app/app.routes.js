'use strict';

angular
  .module('mentors4me')
  .config(function($routeProvider, USER_ROLES){
    $routeProvider.when('/home', {
      templateUrl : 'app/components/home/home.html',
      controller : 'homeController'
    })
    .when('/mentors', {
      templateUrl : 'app/components/mentor/mentor.html',
      controller : 'mentorController'
    })
    .when('/mentors/:mentorId', {
      templateUrl : 'app/components/mentor/mentor-details.html',
      controller : 'mentorDetailsController',
    })
    .when('/organizations/:organizationId', {
      templateUrl : 'app/components/profile/organization/profile.html',
      controller : 'editOrganizationController',
      data: {
        authorizedRoles: [USER_ROLES.ORGANIZATION]
      }
    })
    .when('/login', {
      templateUrl : 'app/components/authentication/login.html',
      controller : 'loginController'
    })
    .when('/register', {
      templateUrl : 'app/components/register/register.html',
      controller : 'registerController'
    })
    .when('/mentors/:mentorId/invite', {
      templateUrl : 'app/components/mentor/invitation.html',
      controller : 'mentorDetailsController'
    })
    .when('/propose', {
     templateUrl : 'app/components/mentor/proposal.html',
     controller : 'mentorProposalController'
   })
    .when('/mentors/register/:token',{
      templateUrl:'app/components/mentor/createMentor.html',
      controller:'createMentorController'
    })
    .when('/dashboard/organization',{
      templateUrl:'app/components/dashboard/organization/dashboardOrganization.html',
      controller:'dashboardOrganizationController',
      data: {
        authorizedRoles: [USER_ROLES.ORGANIZATION]
      }
    })
    .when('/dashboard/admin',{
      templateUrl:'app/components/dashboard/admin/dashboardAdmin.html',
      controller:'dashboardAdminController',
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when('/dashboard/mentor',{
      templateUrl:'app/components/dashboard/mentor/dashboardMentor.html',
      controller:'dashboardMentorController',
      data: {
        authorizedRoles: [USER_ROLES.MENTOR]
      }
    })
    .when('/organizations/:id/edit',{
      templateUrl:'app/components/profile/organization/editProfile.html',
      controller:'editOrganizationController',
      data: {
        authorizedRoles: [USER_ROLES.ORGANIZATION]
      }
    })
    .when('/mentors/:id/edit',{
      templateUrl:'app/components/profile/mentor/editProfile.html',
      controller:'editMentorController',
      data: {
        authorizedRoles: [USER_ROLES.MENTOR]
      }
    })
    .when('/contexts/:id',{
      templateUrl:'app/components/context/context.html',
      controller:'contextController',
      data: {
        authorizedRoles: [USER_ROLES.ORGANIZATION, USER_ROLES.MENTOR]
      }
    })
    .when('/notAuthorized',{
      templateUrl:'app/components/authorization/not.authorized.html',
    })
    .otherwise('/home');
  })
