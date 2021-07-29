<?php

namespace Drupal\c2distro\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Subscriber for routes.
 */
class C2dRouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {
    // Access to 'Structure' route.
    if ($route = $collection->get('system.admin_structure')) {
      $route->setRequirements([
        '_permission' => 'access taxonomy overview',
      ]);
    }
  }

}
