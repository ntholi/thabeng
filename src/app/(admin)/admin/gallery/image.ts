import { Resource } from '../../admin-core/repository/repository';

export interface GalleryImage extends Resource {
  caption: string;
  image: string;
}
