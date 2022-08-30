// import * as Api from '../../api';

const Search = () => {
  // const getRes = await Api.get('awards', paramsUserId ? paramsUserId : id);

  return <>
      <form name="profile" action="/action_page.php" method="get" autocomplete="on">
        <select>
          <option value="blue">통합검색</option>
          <option value="id">아이디</option>
          <option value="email">이메일</option>
        </select>
        <input type="text" placeholder="검색어를 입력해 주세요"/>
        <input type="submit" value="🔍"/>
      </form>
    </>
};

export default Search;

{/* 

  검색은 form 형태, 옵션을 선택한다음, 
  옵션 + 내용 url querystring으로 GET요청 주시고, 
  데이터는 검색과 관련 userlist를 드립니다. 
  그다음에는 네트워크 페이지에서 usercard(?) map하시면 될거 같아요.
  나중에 종합적인 에러처리 관련해서 같이 처리 

*/}