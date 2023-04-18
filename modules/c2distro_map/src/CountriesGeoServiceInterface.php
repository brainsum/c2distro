<?php

namespace Drupal\c2distro_map;

use Drupal\node\NodeInterface;

/**
 * Interface CountriesGeoServiceInterface.
 */
interface CountriesGeoServiceInterface {

  /**
   * Return countries geodata.
   *
   * @param bool $reset
   *   The state reset flag.
   *
   * @throws \Drupal\Core\Entity\EntityMalformedException
   *
   * @return array
   *   The locations geodata array.
   */
  public function getCountriesGeoData(bool $reset = FALSE);

  /**
   * Return country geodata.
   *
   * @param \Drupal\node\NodeInterface $country
   *   The country node.
   * @param bool $reset
   *   The state reset flag.
   *
   * @throws \Drupal\Core\Entity\EntityMalformedException
   *
   * @return array
   *   The locations geodata array.
   */
  public function getCountryGeoData(NodeInterface $country, bool $reset = FALSE);

  /**
   * Return region geodata.
   *
   * @param \Drupal\node\NodeInterface $region
   *   The region node.
   * @param bool $reset
   *   The state reset flag.
   *
   * @throws \Drupal\Core\Entity\EntityMalformedException
   *
   * @return array
   *   The locations geodata array.
   */
  public function getRegionGeoData(NodeInterface $region, bool $reset = FALSE);

}
