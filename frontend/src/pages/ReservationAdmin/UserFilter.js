// import { useState } from "react";
import { useState } from "react";
import { SmallButton } from "../../components/Button";

function UserFilter({ onSearch }) {
  const [itemNameSearch, setItemNameSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSearchChange = (e) => {
    setItemNameSearch(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleSearchClick = () => {
    // 검색 버튼이 클릭되면 부모 컴포넌트에 검색 조건을 넘깁니다.
   alert("검색")
  };

  return(
    <div className="UserFilter" style={{margin:"10px", border:"1px solid #45CB85", height:"300px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <div>
        <input
          type="text"
          value={itemNameSearch}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <input
          type="date"
          value={fromDate}
          onChange={handleFromDateChange}
        />
        ~
        <input
          type="date"
          value={toDate}
          onChange={handleToDateChange}
        />
      </div>
      <div>
        <SmallButton onClick={handleSearchClick}>검색하기</SmallButton>
      </div>
    </div>
  );
}
export default UserFilter