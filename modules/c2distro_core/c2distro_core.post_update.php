<?php

/**
 * @file
 * C2distro_core module updates once other modules have made their own updates.
 */

/**
 * Set Password never expires to true for existing AD users.
 */
function c2distro_core_post_update_set_password_never_expires() {
  $userStorage = \Drupal::entityTypeManager()->getStorage('user');
  $users = $userStorage->loadMultiple();
  foreach ($users as $user) {
    $value = \Drupal::service('user.data')->get('openid_connect', $user->id(), 'oidc_name');
    if ($value) {
      $user->set('field_password_never_expires', TRUE);
      $user->set('field_password_expiration', FALSE);
      $user->save();
    }
  }
}
