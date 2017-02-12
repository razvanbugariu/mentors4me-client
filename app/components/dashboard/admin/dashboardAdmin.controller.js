'use strict';

angular
  .module('mentors4me')
  .controller('dashboardAdminController', dashboardAdminController);

function dashboardAdminController($scope, $location, $cookies, $translate, dashboardAdminService, growl, Constants) {

  $scope.mentors = [];
  $scope.organizations = [];
  $scope.proposals = [] ;
  $scope.errors = [];

  $scope.approveMentor = approveMentor;
  $scope.rejectMentor = rejectMentor;
  $scope.deleteOrganization = deleteOrganization;
  $scope.deleteMentor = deleteMentor;

  $scope.tabs = [
    {
      title: $translate.instant('approval_requests'),
      templateUrl: 'app/components/dashboard/admin/pendingRequests.html'
    },
    {
      title: $translate.instant('active_mentors'),
      templateUrl: 'app/components/dashboard/admin/mentors.html'
    },
    {
      title: $translate.instant('active_organizations'),
      templateUrl: 'app/components/dashboard/admin/organizations.html'
    },
  ];

  function getPendingProposals(){
    dashboardAdminService.getPendingProposals($cookies.get(Constants.TOKEN)).then(handleGetProposalsSuccess, handleErrors);
  }
  function approveMentor(proposal){
    dashboardAdminService.approveMentor(proposal.id, $cookies.get(Constants.TOKEN)).then(handleApproveSuccess, handleErrors);
  }

  function rejectMentor(proposal){
    dashboardAdminService.rejectMentor(proposal.id, $cookies.get(Constants.TOKEN)).then(handleRejectSuccess, handleErrors);
  }

  function deleteFromProposals(proposal){
    $scope.proposals.remove(proposal);
  }

  function handleGetProposalsSuccess(responseData){
    $scope.proposals = responseData.data.data;
  }

  function handleApproveSuccess(response){
    growl.info("approve_mentor");
    getPendingProposals();
  }

  function handleRejectSuccess(response){
    growl.info("reject_mentor");
    getPendingProposals();
  }

  function getAllMentors(){
    dashboardAdminService.getAllMentors().then(handleGetMentorsSuccess, handleErrors);
  }

  function handleErrors(responseError){
    $scope.errors = responseError.data.errors;
  }

  function handleGetMentorsSuccess(responseData){
    $scope.mentors = responseData.data.data;
  }

  function getAllOrganizations(){
    dashboardAdminService.getAllOrganizations().then(handleGetOrganizationsSuccess, handleErrors);
  }

  function handleGetOrganizationsSuccess(responseData){
    $scope.organizations = responseData.data.data;
  }

  function deleteMentor(mentorId){

    dashboardAdminService.deleteMentor(mentorId).then(handleDeleteMentorSuccess, handleErrors);
  }

  function handleDeleteMentorSuccess(){
    displayDeleteEntry();
    getAllMentors();
  }

  function deleteOrganization(organizationId){
    dashboardAdminService.deleteOrganization(organizationId).then(handleDeleteOrganizationSuccess, handleErrors);
  }

  function handleDeleteOrganizationSuccess(){
    displayDeleteEntry();
    getAllOrganizations();
  }

  function displayDeleteEntry(){
    growl.info("delete_entry");
  }

  getPendingProposals();
  getAllMentors();
  getAllOrganizations();
}
