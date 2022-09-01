## 프로필 사진 업로드

```js
[POST] 서버주소/user/images/profile

//body
file: 이미지.png
```

- form-data 형식으로 파일 첨부해서 요청하시면 됩니다.
- 파일은 1개만 가능합니다. (2개 이상 에러)
- `키는 'file'`로 보내셔야 정상 업로드 됩니다.
- 확장자는 png, jpeg, jpg 만 가능합니다.
- back/src/images/profiles 에 이미지 파일 저장됩니다. (300x300)

## 프로필 사진 URL 요청

```js
[GET] 서버주소/:userId/images/profile
```

- 조회하고자 하는 userId 파라미터 값으로 보내시면 됩니다.
- 응답 시 해당 이미지 리소스 url이 응답합니다.
- 모든 유저는 back/src/images/default_profile_image.png 를 기본 프사로 가집니다.

```js
예시) http://localhost:5001/profiles/65782e08-4e83-4b88-bffc-838ba26fb662.png
```

## 프로필 사진 초기화

```js
[DELETE] 서버주소/user/images/profile
```

- back/src/images/profiles 경로에 저장되어 있던 프사가 삭제됩니다.
- default_profile_image.png 로 프사가 대체됩니다.