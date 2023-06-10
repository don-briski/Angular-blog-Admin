export interface Post {
  title: string;
  permalink: string;
  category: {
    categoryid: string;
    category: string;
  };
  postImgPath: string;
  excerpt: string;
  content: string;
  isFeatured: boolean;
  views: number;
  status: string;
  createdAt: Date;
}
