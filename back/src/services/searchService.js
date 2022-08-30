import { User } from "../db/models/User";
import { ERRORS } from "../constants/constants";

const searchService = {
  getSearches: async ({ option, contents }) => {
    let searchOption;
    if (option === "name") {
      searchOption = { name: new RegExp(contents) };
    } else if (option === "email") {
      searchOption = { email: new RegExp(contents) };
    } else if (option === "description") {
      searchOption = { description: new RegExp(contents) };
    } else if (option === "all") {
      searchOption = { contents: new RegExp(contents) };
    } else {
      throw new Error(ERRORS.BODY_DATA_ERROR.errorCode);
    }
    const searches = await User.findSearchData(searchOption);
    return searches;
  },
};

export { searchService };
