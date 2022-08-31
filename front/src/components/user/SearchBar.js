import * as Api from "../../api";
import { useState } from "react";
import searchBar from "../../styles/searchBar.css";

const Search = ({ setSearchData, setIsEmpty }) => {
  const [Selected, setSelected] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const test = (e) => {
    e.preventDefault();
    Api.get2(`search?option=${Selected}&contents=${inputValue}`).then((res) => {
      setSearchData(res.data);
      console.log(res.data);
    });
  };
  const handleChangeInput = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setIsEmpty(false);
  };
  const handleChangeSelect = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
  };

  return (
    <div css={{ searchBar }}>
      <form
        id="formInput"
        name="profile"
        onChange={handleChangeInput}
        autocomplete="on"
      >
        <select onChange={handleChangeSelect}>
          <option value="all">통합검색</option>
          <option value="name">이름</option>
          <option value="email">이메일</option>
          <option value="description">내용</option>
        </select>
        <input type="text" style={{ display: "none" }} />
        <input
          type="text"
          placeholder="검색어를 입력해 주세요"
          onKeyUp={test}
        />
        <input type="button" value="🔍" onClick={test} />
      </form>
    </div>
  );
};

export default Search;

{
  /* 

  검색은 form 형태, 옵션을 선택한다음, 
  옵션 + 내용 url querystring으로 GET요청 주시고, 
  데이터는 검색과 관련 userlist를 드립니다. 
  그다음에는 네트워크 페이지에서 usercard(?) map하시면 될거 같아요.
  나중에 종합적인 에러처리 관련해서 같이 처리 

*/
}
