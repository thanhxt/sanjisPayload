export type ImageSize = {
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
  url: string;
};

export type Image = {
  createdAt: string;
  updatedAt: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  sizes: {
    thumbnail: ImageSize;
    card: ImageSize;
    tablet: ImageSize;
  };
  id: string;
  url: string;
  thumbnailURL: string;
};

export type Hero = {
  createdAt: string;
  updatedAt: string;
  title: string;
  image: Image;
  id: string;
};
