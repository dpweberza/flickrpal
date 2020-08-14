import jsonp from "jsonp-modernized";

export interface PhotoItem {
  title: string;
  link: string;
  media: {
    m: string;
  };
  author: string;
  author_id: string;
  tags: string;
}

interface PublicPhotosResponse {
  items: PhotoItem[];
}

export const searchPublicPhotos = async (
  tags: string
): Promise<PublicPhotosResponse> => {
  return await jsonp(
    "https://www.flickr.com/services/feeds/photos_public.gne",
    {
      callbackParameter: "jsoncallback",
      parameters: {
        format: "json",
        tags
      }
    }
  );
};
