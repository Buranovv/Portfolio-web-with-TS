import User from "./user";

interface Skill {
  _id: string;
  percent: number;
  name: string;
  user: User;
}

export default Skill;
