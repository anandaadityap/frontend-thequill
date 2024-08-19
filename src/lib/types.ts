export type ResponseGetContent = {
  id: string;
  title: string;
  subject: string;
  article: string;
  user_id: string;
  image_banner: string;
  recommend: false;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    biodata: string;
    avatar_url: string;
    created_at: string;
    updated_at: string;
    deleted_at: null | string;
  };
};

export type ResponseUserProfile = {
  id: string;
  username: string;
  email: string;
  role: string;
  biodata: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};
