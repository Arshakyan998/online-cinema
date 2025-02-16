interface User {
  avatarUrl: string;
  fullName: string;
}
export interface IComments {
  id: string;
  userId: string;
  createdAt: Date;
  comment: string;
  updatedAt: Date;
  movieId: string;
  User: User;
}
