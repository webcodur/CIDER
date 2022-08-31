const ERRORS = {
  UNDEFINED_ERROR: {
    errorCode: "UNDEFINED_ERROR",
    errorMessage: "정의되지 않은 에러입니다.",
  },

  CONTENT_TYPE_ERROR: {
    errorCode: "CONTENT_TYPE_ERROR",
    errorMessage: "headers의 Content-Type을 application/json으로 설정해주세요",
  },

  BODY_DATA_ERROR: {
    errorCode: "BODY_DATA_ERROR",
    errorMessage: "데이터가 충분하지 않습니다.",
  },

  USER_ID_ERROR: {
    errorCode: "USER_ID_ERROR",
    errorMessage: "유효하지 않은 사용자입니다.",
  },

  ITEM_ID_ERROR: {
    errorCode: "ITEM_ID_ERROR",
    errorMessage: "유효하지 않은 ID입니다.",
  },

  UPDATE_DATA_ERROR: {
    errorCode: "UPDATE_DATA_ERROR",
    errorMessage: "업데이트 할 데이터가 없습니다.",
  },

  IMAGE_TYPE_ERROR: {
    errorCode: "IMAGE_TYPE_ERROR",
    errorMessage: "*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다.",
  },

  DEFAULT_IMAGE_ERROR: {
    errorCode: "DEFAULT_IMAGE_ERROR",
    errorMessage: "이미 프로필 사진이 DEFAULT_IMAGE 입니다.",
  },
};

const DEFAULT_PROFILE_IMAGE = {
  originalName: "default_profile_image.png",
  fileName: "default_profile_image.png",
  path: "/default_profile_image.png",
};

export { ERRORS, DEFAULT_PROFILE_IMAGE };
