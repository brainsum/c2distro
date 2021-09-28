<?php

namespace Drupal\c2distro_core\Plugin\media\Source;

use Drupal\media\Plugin\media\Source\File as CoreMediaSourceFile;
use Drupal\media\MediaInterface;

/**
 * File entity media source.
 *
 * @see \Drupal\file\FileInterface
 *
 * @MediaSource(
 *   id = "file",
 *   label = @Translation("File"),
 *   description = @Translation("Use local files for reusable media."),
 *   allowed_field_types = {"file"},
 *   default_thumbnail_filename = "generic.png"
 * )
 */
class File extends CoreMediaSourceFile {

  /**
   * {@inheritdoc}
   */
  public function getMetadata(MediaInterface $media, $attribute_name) {
    /** @var \Drupal\file\FileInterface $file */
    $file = $media->get($this->configuration['source_field'])->entity;
    // If the source field is not required, it may be empty.
    if (!$file) {
      return parent::getMetadata($media, $attribute_name);
    }

    if ($attribute_name === 'thumbnail_uri') {
      if (empty($media->thumbnail->target_id)) {
        return $this->getThumbnail($file) ?: parent::getMetadata($media, $attribute_name);
      }
      return $this->entityTypeManager->getStorage('file')->load($media->thumbnail->target_id)->getFileUri();

    }
    else {
      return parent::getMetadata($media, $attribute_name);
    }
  }

}
