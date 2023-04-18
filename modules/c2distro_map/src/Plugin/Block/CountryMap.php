<?php

namespace Drupal\c2distro_map\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;

/**
 * Provides a 'CountryMap' block.
 *
 * @Block(
 *  id = "country_map",
 *  admin_label = @Translation("Country map"),
 * )
 */
class CountryMap extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];

    $geodataJson = \Drupal::service('c2distro_map.geo')->getCountriesGeoData();
    $build['map'] = [
      '#type' => 'container',
      '#theme' => 'country_map',
      '#attached' => [
        'library' => 'c2distro_map/gmap',
        'drupalSettings' => [
          'geodata' => $geodataJson,
          'map_popup' => TRUE,
          'map_full' => TRUE,
        ],
      ],
    ];

    return $build['map'];
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    return ['url'];
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheMaxAge() {
    return Cache::PERMANENT;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags() {
    return [
      'node_list:country',
      'taxonomy_term_list:country',
    ];
  }

}
