import { module } from 'angular';
import { react2angular } from 'react2angular';

import { withErrorBoundary } from 'core/presentation/SpinErrorBoundary';

import { PermissionsConfigurer } from './PermissionsConfigurer';

export const PERMISSIONS_CONFIGURER_COMPONENT = 'spinnaker.application.permissionsConfigurer.component';
module(PERMISSIONS_CONFIGURER_COMPONENT, []).component(
  'permissionsConfigurer',
  react2angular(withErrorBoundary(PermissionsConfigurer, 'permissionsConfigurer'), [
    'permissions',
    'requiredGroupMembership',
    'onPermissionsChange',
  ]),
);
