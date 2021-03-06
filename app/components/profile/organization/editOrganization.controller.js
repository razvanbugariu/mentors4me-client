'use strict';

angular
  .module('mentors4me')
  .controller('editOrganizationController', editOrganizationController);

function editOrganizationController($scope, editOrganizationService, $location, Constants, $cookies, growl) {

  $scope.errors = [];

  $scope.updateOrganization = updateOrganization;
  $scope.edit = edit;

  function getCurrentOrganization() {
    editOrganizationService.getCurrentOrganization().then(handleGetCurrentUserSuccess, handleErrors);
  }

  function handleGetCurrentUserSuccess(response) {
    $scope.currentUser = response.data.data;
  }

  function updateOrganization() {
    editOrganizationService.updateOrganization($scope.currentUser).then(handleUpdateSuccess, handleErrors);
  }

  function handleUpdateSuccess() {
    growl.info("profile_update_success");
    $location.path(Constants.PROFILE_ORGANIZATION + $cookies.get(Constants.USER_ID));
  }

  function handleErrors(responseError) {
    $scope.errors = responseError.data.errors;
  }

  function edit() {
    $location.path(Constants.PROFILE_ORGANIZATION + $cookies.get(Constants.USER_ID) + Constants.EDIT);
  }

  getCurrentOrganization();
}
