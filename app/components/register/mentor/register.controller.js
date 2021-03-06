'use strict';

angular
  .module('mentors4me')
  .controller('registerMentorController', registerMentorController);

function registerMentorController($scope, $location, registerService, skillsService, $routeParams, Constants, growl) {

  $scope.errors = [];

  $scope.register = register;
  $scope.selectedSkills = [];

  function register() {
    var obj = {
      email: $scope.user.email,
      first_name: $scope.user.first_name,
      last_name: $scope.user.last_name,
      description: $scope.user.description,
      city: $scope.user.city,
      phone_number: $scope.user.phone_number,
      password: $scope.user.password,
      password_confirmation: $scope.user.confirm_password,
      skills: selectIds($scope.selectedSkills),
      facebook: $scope.user.facebook,
      linkedin: $scope.user.linkedin
    };
    registerService.registerMentor(obj, $routeParams.token).then(handleCreateSuccess, handleErrors);
  }

  function selectIds(skillsArray) {
    var skillsIds = [];
    skillsArray.forEach(function(skill) {
      skillsIds.push(skill.id)
    });
    return skillsIds
  }

  function handleCreateSuccess(response) {
    growl.info("accout_created_success");
    $location.path(Constants.LOGIN);
  }

  function handleErrors(responseError) {
    $scope.errors = responseError.data.errors;
  }

  function getSkills() {
    skillsService.getAllSkills().then(handleGetAllSkillsSuccess, handleErrors);
  }

  function handleGetAllSkillsSuccess(response) {
    $scope.optionsList = response.data.data;
  }

  getSkills();
}
