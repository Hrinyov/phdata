export interface Data {
  ISO?: string;
  FNumber?: string;
  ExposureTime?: string;
  WhiteBalance?: string;
  FocalLength?: string;
  Model?: string;
}

export interface PostData {
  id: string;
  imageUrl: string;
  description?: string;
}