'use strict';

let angular = require('angular');

require('./confirmationModal.less');

module.exports = angular
  .module('spinnaker.core.confirmationModal.controller', [
    require('angular-ui-bootstrap'),
    require('../application/modal/platformHealthOverride.directive.js'),
    require('../task/monitor/taskMonitorService.js'),
  ])
  .controller('ConfirmationModalCtrl', function($scope, $modalInstance, taskMonitorService, params) {
    $scope.params = params;

    $scope.state = {
      submitting: false
    };

    if (params.taskMonitorConfig) {
      params.taskMonitorConfig.modalInstance = $modalInstance;

      $scope.taskMonitor = taskMonitorService.buildTaskMonitor(params.taskMonitorConfig);
    }

    $scope.verification = {
      required: !!params.account || (params.verificationLabel && params.textToVerify !== undefined),
      toVerify: params.textToVerify,
    };

    this.formDisabled = () => $scope.verification.required && !$scope.verification.verified;

    function showError(exception) {
      $scope.state.error = true;
      $scope.state.submitting = false;
      $scope.errorMessage = exception;
    }

    this.confirm = function () {
      if (!this.formDisabled()) {
        if ($scope.taskMonitor) {
          $scope.taskMonitor.submit(() => { return params.submitMethod(params.interestingHealthProviderNames); });
        } else {
          if (params.submitMethod) {
            $scope.state.submitting = true;
            params.submitMethod(params.interestingHealthProviderNames).then($modalInstance.close, showError);
          } else {
            $modalInstance.close();
          }
        }
      }
    };

    this.cancel = $modalInstance.dismiss;
  });
