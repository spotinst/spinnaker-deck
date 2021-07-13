'use strict';

import { module } from 'angular';

import { SERVER_GROUP_WRITER, TaskMonitor } from '@spinnaker/core';

export const SPOT_SERVERGROUP_DETAILS_SCALINGPOLICY_CONTROLLER = 'spinnaker.spot.serverGroup.scalingPolicy.controller';
export const name = SPOT_SERVERGROUP_DETAILS_SCALINGPOLICY_CONTROLLER; // for backwards compatibility
module(SPOT_SERVERGROUP_DETAILS_SCALINGPOLICY_CONTROLLER, [SERVER_GROUP_WRITER]).controller(
  'spotScalingPolicyCreationCtrl',
  [
    '$scope',
    '$uibModalInstance',
    'serverGroupWriter',
    'serverGroup',
    'application',
    '$uibModal',
    function($scope, $uibModalInstance, serverGroupWriter, serverGroup, application, $uibModal) {
      this.serverGroup = serverGroup;
      this.application = application;

      this.cancel = function() {
        $uibModalInstance.dismiss();
      };
      this.createSimpleScalingPolicy = () => {
        //closing the existing modal of creation scaling policy
        $uibModalInstance.close();
        //open the new modal of simple scaling policy
        $uibModal.open({
          templateUrl: require('./simpleScalingPolicy/simpleScalingPolicy.html'),
          controller: 'spotSimpleScalingPolicyCtrl as ctrl',
          resolve: {
            serverGroup: () => this.serverGroup,
            action: () => 'Create',
            application: () => this.application,
            policy: () => undefined,
          },
        });
      };
      this.createTargetScalingPolicy = () => {
        //closing the existing modal of creation scaling policy
        $uibModalInstance.close();
        //open the new modal of target scaling policy
        $uibModal.open({
          templateUrl: require('./targetScalingPolicy/targetScalingPolicy.html'),
          controller: 'spotTargetScalingPolicyCtrl as ctrl',
          resolve: {
            serverGroup: () => this.serverGroup,
            action: () => 'Create',
            application: () => this.application,
            policy: () => undefined,
          },
        });
      };

      this.hasSimplePolicies = () => {
        let retVal = false;

        const scalingObj = this.serverGroup.elastigroup.scaling;
        if (scalingObj) {
          const scaleUpPolicies = this.serverGroup.elastigroup.scaling.up;
          const scaleDownPolicies = this.serverGroup.elastigroup.scaling.down;
          if (scaleUpPolicies || scaleDownPolicies) {
            retVal = true;
          }
        }
        return retVal;
      };

      this.hasTargetPolicies = () => {
        let retVal = false;

        const scalingObj = this.serverGroup.elastigroup.scaling;
        if (scalingObj) {
          const targetPolicies = this.serverGroup.elastigroup.scaling.target;
          if (targetPolicies) {
            retVal = true;
          }
        }
        return retVal;
      };
    },
  ],
);