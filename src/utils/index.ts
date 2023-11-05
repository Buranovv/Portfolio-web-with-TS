import { PHOTO_URL } from "../constants";
import PhotoData from "../types/photo";

export const getPhoto = (photo: PhotoData) => {
  const photoId = photo?._id;
  const photoType = photo?.name?.split(".")[1];
  const realPhoto = `${photoId}.${photoType}`;

  return `${PHOTO_URL}${realPhoto}`;
};

export const getUserPhoto = (photo: string) => {
  return `${PHOTO_URL}${photo}`;
};
