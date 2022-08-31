import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async findSearchData(searchOption) {
    if (searchOption.contents) {
      const searches = await UserModel.find(
        {
          $text: {
            $search: `${searchOption.contents}`,
          },
        },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });

      const reSearches = await UserModel.find({
        $or: [
          { email: searchOption.contents },
          { name: searchOption.contents },
          { description: searchOption.contents },
        ],
      });
      return searches, reSearches;
    }

    const searches = await UserModel.find(searchOption);
    return searches;
  }
}

export { User };
