'use strict';

angular
	.module('mentors4me')
	.controller('mentorProposalController', mentorProposalController);

function mentorProposalController($scope, $location, mentorService, Constants, chatService) {

	$scope.errors = [];

	$scope.proposeMentor = proposeMentor;

	function proposeMentor(){
		var proposal = {
			email : $scope.proposal.email,
			description : $scope.proposal.description
		}
		mentorService.proposeMentor(proposal).then(handleProposalSuccess, handleErrors);
	}

	function handleProposalSuccess(response){
		growl.info("Mentorul a fost recomandat cu suces");
		$location.path(Constants.HOME);
	}

	function handleErrors(responseError){
		$scope.errors = responseError.data.errors;
	}

	$scope.send = send;
	function send(){
		chatService.sendMessage();
	}

}
