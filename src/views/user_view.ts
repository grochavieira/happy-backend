import User, { IUser } from "../models/User";

export default {
  render(user: IUser) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  },

  renderMany(users: IUser[]) {
    return users.map((user) => this.render(user));
  },
};
