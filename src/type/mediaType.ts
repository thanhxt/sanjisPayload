export type MediaSize = {
    width: number;
    height: number;
    mimeType: string;
    filesize: number;
    filename: string;
    url: string;
  }
  
  export type MediaSizes = {
    thumbnail: MediaSize;
    card: MediaSize;
    tablet: MediaSize;
  }
  
  export type Media = {
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
    sizes: MediaSizes;
    id: string;
    url: string;
    thumbnailURL: string;
  }