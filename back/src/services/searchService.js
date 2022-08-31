import { User } from "../db";
import { ERRORS } from "../constants/constants";

const searchService = {
  getSearches: async ({ option, contents }) => {
    let searchOption;

    switch (option) {
      case "name":
        searchOption = { name: new RegExp(contents) };
        break;
      case "email":
        searchOption = { email: new RegExp(contents) };
        break;
      case "description":
        searchOption = { description: new RegExp(contents) };
        break;
      case "all":
        searchOption = { contents: new RegExp(contents) };
        break;

      default:
        throw new Error(ERRORS.BODY_DATA_ERROR.errorCode);
    }

    const searches = await User.findSearchData(searchOption);
    return searches;
  },
};

export { searchService };
