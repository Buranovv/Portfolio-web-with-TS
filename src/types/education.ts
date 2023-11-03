import User from "./user";

interface Education {
  _id: string;
  level: string;
  name: string;
  user: User;
  description: string;
}

export default Education;
