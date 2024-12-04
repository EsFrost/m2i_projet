export interface Photo {
  id: string;
  user_id: string;
  name: string;
  description: string;
  path: string;
  status: boolean;
}

export interface Comment {
  id: string;
  content: string;
  id_photo: string;
  id_user: string;
  statues: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  user_icon: string;
}
