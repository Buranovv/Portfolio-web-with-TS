interface Universal {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  email: string;
  facebook: string;
  github: string;
  info: string;
  instagram: string;
  phoneNumber: string;
  telegram: string;
  youtube: string;
  photo: string;
  password: string;
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
  map: (func: object) => void;
}

export default Universal;
