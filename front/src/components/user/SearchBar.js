import * as Api from "../../api";
import { useState } from "react";
import searchBar from "../../styles/searchBar.css";
import { Form } from "react-bootstrap";
const Search = ({ setSearchData, setIsEmpty }) => {
  const [Selected, setSelected] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const test = () => {
    setTimeout(() => {
      Api.get2(`search?option=${Selected}&contents=${inputValue}`).then(
        (res) => {
          setSearchData(res.data);
        }
      );
    }, 1000);
  };
  const handleChangeInput = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setIsEmpty(true);
  };

  const handleChangeSelect = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
  };

  return (
    <div css={{ searchBar }} id="formInput">
      {/* <select onChange={handleChangeSelect}>
        <option value="all">통합 검색</option>
        <option value="name">이름</option>
        <option value="email">이메일</option>
        <option value="description">내용</option>
      </select> */}

      <form
        // id="formInput"
        id="formwidth"
        name="profile"
        onChange={handleChangeInput}
        autoComplete="on"
      >
        <Form.Select
          aria-label="Default select example"
          onChange={handleChangeSelect}
          style={{ height: "100%", width: "150px" }}
        >
          <option value="all">통합 검색</option>
          <option value="name">이름</option>
          <option value="email">이메일</option>
          <option value="description">내용</option>
        </Form.Select>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="search"
            className="form-control rounded formsearch"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            onKeyUpCapture={test}
            // style={{ height: "38px", width: "150px" }}
            style={{ Width: "100%", minWidth: "150px" }}
          />
          <input style={{ display: "none " }} />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        {/* <button type="button" class="btn btn-outline-primary" onClick={test}>
            search
          </button> */}
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
