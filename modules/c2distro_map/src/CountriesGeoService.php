<?php

namespace Drupal\c2distro_map;

use Drupal\Core\Cache\Cache;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\node\NodeInterface;

/**
 * Class CountriesGeoService.
 */
class CountriesGeoService implements CountriesGeoServiceInterface {

  /**
   * Symfony\Component\DependencyInjection\ContainerInterface define.
   *
   * @var \Symfony\Component\DependencyInjection\ContainerInterface
   */
  protected $container;

  /**
   * Drupal\Core\Cache\CacheBackendInterface define.
   *
   * @var \Drupal\Core\Cache\CacheBackendInterface
   */
  protected $cache;

  /**
   * Drupal\Core\Entity\EntityTypeInterface define.
   *
   * @var \Drupal\Core\Entity\EntityTypeInterface
   */
  protected $entityType;

  /**
   * The country poligons data.
   *
   * @var array
   */
  protected $poligons;

  /**
   * The poligons files.
   *
   * @var array
   */
  protected $files;

  /**
   * The geodata array definition.
   *
   * @var array
   */
  protected $geoData;

  /**
   * Constructs a new CountriesGeoService object.
   *
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   *   A container instance.
   */
  public function __construct(ContainerInterface $container) {
    $this->container = $container;
    $this->cache = $container->get('cache.data');
    $this->entityType = $container->get('entity_type.manager');
    $this->files = $this->getPoligonFiles();
  }

  /**
   * {@inheritdoc}
   */
  public function getCountriesGeoData(bool $reset = FALSE) {

    if (empty($this->geoData)) {
      $this->prepareCountriesGeoData($reset);
    }

    return [
      'geoData' => $this->geoData,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getCountryGeoData(NodeInterface $country, bool $reset = FALSE) {

    if (empty($this->geoData)) {
      $this->geoData = $this->defaultData();
      $this->prepareCountryData($country, $reset);
    }

    // Get custom map zoom, map center from taxonomy term.
    $countryTerms = $this->entityType->getStorage('taxonomy_term')->loadByProperties([
      'vid' => 'geographical_area',
      'name' => $country->get('field_country')->entity->name->value,
      'status' => 1,
    ]);
    $countryTerm = reset($countryTerms);
    $mapZoom = $countryTerm->field_map_zoom->value;
    $mapCenter = $countryTerm->field_map_center;

    if ($mapCenter && $mapZoom) {
      $this->geoData['mapData'] = [
        'zoom' => $mapZoom,
        'center' => array_column($mapCenter->getValue(), 'value'),
      ];
    }

    return [
      'geoData' => $this->geoData,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getRegionGeoData(NodeInterface $region, bool $reset = FALSE) {

    if (empty($this->geoData)) {
      $this->geoData = $this->defaultData();
      $this->prepareDataFromRegions($region, $reset);
    }

    // Get custom map zoom, map center from taxonomy term.
    $mapZoom = $region->get('field_geographical_area')->entity->field_map_zoom->value;
    $mapCenter = $region->get('field_geographical_area')->entity->field_map_center;
    if ($mapCenter && $mapZoom) {
      $this->geoData['mapData'] = [
        'zoom' => $mapZoom,
        'center' => array_column($mapCenter->getValue(), 'value'),
      ];
    }

    return [
      'geoData' => $this->geoData,
    ];
  }

  /**
   * Prepare countries geo data.
   *
   * @param bool $reset
   *   The reset flag for rebuild data.
   *
   * @throws \Drupal\Core\Entity\EntityMalformedException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   */
  protected function prepareCountriesGeoData(bool $reset = FALSE) {
    $this->geoData = $this->defaultData();
    $this->prepareDataFromCountries($reset);
  }

  /**
   * Prepare data from countries contents.
   *
   * @param bool $reset
   *   The reset flag for rebuild data.
   *
   * @throws \Drupal\Core\Entity\EntityMalformedException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   */
  protected function prepareDataFromCountries(bool $reset = FALSE) {
    $countries = $this->entityType->getStorage('node')->loadByProperties([
      'type' => 'country',
      'status' => 1,
    ]);
    foreach ($countries as $country) {
      $this->prepareCountryData($country, $reset);
    }
  }

  /**
   * Prepare data from countries contents.
   *
   * @param \Drupal\node\NodeInterface $region
   *   The region node.
   * @param bool $reset
   *   The reset flag for rebuild data.
   *
   * @throws \Drupal\Core\Entity\EntityMalformedException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   */
  protected function prepareDataFromRegions($region, bool $reset = FALSE) {
    $regionTid = $region->get('field_geographical_area')->target_id;
    $children = $this->entityType->getStorage('taxonomy_term')->loadChildren($regionTid);
    $tids = array_keys($children);
    $tids[] = $regionTid;

    $query = $this->entityType->getStorage('node')->getQuery('AND');
    $query->condition('type', 'country');
    $query->condition('status', 1);
    $query->condition('field_geographical_area', $tids, 'IN');
    $nids = $query->execute();

    $countries = $this->entityType->getStorage('node')->loadByProperties([
      'type' => 'country',
      'field_geographical_area' => $tids,
      'status' => 1,
    ]);

    foreach ($countries as $country) {
      $this->prepareCountryData($country, $reset);
    }
  }

  /**
   * Prepare country data.
   *
   * @param \Drupal\node\NodeInterface $country
   *   The contact node.
   * @param bool $reset
   *   The reset flag for rebuild data.
   *
   * @throws \Drupal\Core\Entity\EntityMalformedException
   */
  protected function prepareCountryData(NodeInterface $country,
    bool $reset = FALSE) {
    $language = $this->container->get('language_manager')
        ->getCurrentLanguage()->getId();
    $sid = 'c2distro_map.contact_geodata:' . $country->id() . ':' . $language;
    if (!$reset && $data = $this->cache->get($sid)) {
      $data = $data->data;
    }

    $translation = $country;
    if ($country->hasTranslation($language)) {
      $translation = $country->getTranslation($language);
    }
    if (!empty($data)) {
      $this->geoData['features'][] = $data;
      return;
    }

    $country_term_name = $this->getCountryTermName($country);

    if ($country_term_name) {
      $this->preparePoligons($country_term_name);

      if ($geometry = $this->getGeometry($country_term_name)) {
        $data = [
          'type' => 'Feature',
          'properties' => [
            'countryName' => $translation->getTitle(),
            'countryDescription' => $translation->get('field_short_description')->value,
            'defaultZoom' => 4,
            'link' => $translation->toUrl()->toString(),
          ],
          'geometry' => $geometry,
        ];

        $this->cache->set($sid, $data, Cache::PERMANENT, ['node_list:country', 'taxonomy_term_list:countries']);
        $this->geoData['features'][] = $data;
      }
    }
  }

  /**
   * Return country term name of country node.
   *
   * @param NodeInterface $country
   *   The location node.
   *
   * @return string | null
   *   The country term name or null.
   */
  protected function getCountryTermName(NodeInterface $country) {
    $terms = $country->get('field_country')->referencedEntities();
    return $terms ? reset($terms)->getName() : NULL;
  }

  /**
   * Prepare poligons data from file.
   *
   * @param string $country
   *   The country name.
   */
  protected function preparePoligons(string $country) {
    $first = $country[0];
    if (!isset($this->poligons[$this->files[$first]])) {
      $filename = $this->files[$first];
      $path = \Drupal::service('extension.list.module')->getPath('c2distro_map') . '/geo/world-borders/' . $filename;
      if ($json = file_get_contents($path)) {
        $this->poligons[$this->files[$first]] = json_decode($json, TRUE);
      }
    }
  }

  /**
   * Return the geometry data.
   *
   * @param string $country
   *   The country name.
   *
   * @return array
   *   The geometry data.
   */
  protected function getGeometry(string $country) {
    foreach ($this->poligons[$this->files[$country[0]]]['features'] as $data) {
      if (isset($data['properties']['Name']) &&
        !empty($data['geometry']) &&
        $data['properties']['Name'] === $country) {
        return $data['geometry'];
      }
    }

    return [];
  }

  /**
   * This is the default data for geo data.
   *
   * @return array
   *   The default geodata values.
   */
  protected function defaultData(): array {
    return [
      'type' => 'FeatureCollection',
      'features' => [],
    ];
  }

  /**
   * Return poligon holder files array.
   *
   * @return array
   *   The poligin files array.
   */
  protected function getPoligonFiles(): array {
    return [
      'A' => 'A.geojson',
      'B' => 'B.geojson',
      'C' => 'C.geojson',
      'D' => 'D.geojson',
      'E' => 'E.geojson',
      'F' => 'F.geojson',
      'G' => 'G.geojson',
      'H' => 'H.geojson',
      'I' => 'I.geojson',
      'J' => 'J.geojson',
      'K' => 'K.geojson',
      'L' => 'L.geojson',
      'M' => 'M.geojson',
      'N' => 'N.geojson',
      'O' => 'O_P.geojson',
      'P' => 'O_P.geojson',
      'Q' => 'Q_R.geojson',
      'R' => 'Q_R.geojson',
      'S' => 'S.geojson',
      'T' => 'T.geojson',
      'U' => 'U.geojson',
      'V' => 'V_Z.geojson',
      'W' => 'V_Z.geojson',
      'X' => 'V_Z.geojson',
      'Y' => 'V_Z.geojson',
      'Z' => 'V_Z.geojson',
    ];
  }

}
