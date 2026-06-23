export type FeaturedItem = {
  post_id: number;
  title: string;
  image: string;
  image_link: string;
  excerpt?: string;
  link: string;
};

export type PostItem = {
  post_id: number;
  title: string;
  image: string;
  image_link: string;
  link: string;
  date?: string;
  excerpt?: string;
};

export type RawListItem = {
  post_id: number;
  title?: string;
  image?: string;
  image_link?: string;
  excerpt?: string;
  link?: string;
  date?: string;
};

export type Category = {
  category_id: number;
  name: string;
  slug: string;
  parent: number;
  status: string;
};

export type VideoItem = {
  video_id: string;
  title: string;
  category_id: number;
  thumbnail: string;
  url: string;
  description?: string;
  created_at?: string;
};

export type VideoCategory = Category & {
  videos: VideoItem[];
};

export type ApiPost = {
  post_id: number;
  title: string;
  image: string;
  image_link: string;
  excerpt: string;
  content: string;
  date?: string;
  link: string;
  categories?: { category_id: number; name: string }[];
  tags?: { tag_id: number; name: string }[];
  author?: { name: string; image?: string };
};
