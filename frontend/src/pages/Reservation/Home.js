// import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import LargeButton from "../../components/Button";

import RepairshopList from "./RepairshopList";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  const handleOnclick = () => {
    navigate("./MainRepairshop");
  };

  const carcenters = [
    { id: 1, name: "서울점", address: "서울시 서울구 서울동" },
    { id: 2, name: "경기도점", address: "경기도 경기시 경기동" },
    { id: 3, name: "정비소 C", address: "정비소 C에 대한 설명" },
    { id: 4, name: "정비소 D", address: "정비소 D에 대한 설명" },
  ];


  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // 필터링된 정비소 목록을 계산
  const filteredCarcenters = carcenters.filter(carcenter => {
    return carcenter.name.includes(filter);
  });


  return (
    <div className="Reservation" style={{ display: "flex",flexDirection: "column"}}>
      <p style={{ color: "#47F6C1", textAlign: "left",}}>{"<"} 예약하기 - 정비소 목록</p>
      <div style={{marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}>
        {/* 주정비소 컴포넌트 */}
        <RepairshopList address="등록하기에서 post한 값 get으로 받아오기" buttonText="예약하기"/>
        <LargeButton onClick={handleOnclick} style={{marginTop: "30px"}}>주 정비소 등록하기</LargeButton>
      </div>
      
       {/* 정비소 지역 선택박스 */}
       <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "50px", marginBottom: "10px" }}>
        <label htmlFor="local" style={{ color: "#47F6C1" }}>정비소 지역</label>
        <select id="local" onChange={handleFilterChange} style={{ marginLeft: "10px" }}>
          <option value="">전체</option>
          <option value="서울점">서울점</option>
          <option value="경기도점">경기도점</option>
          {/* ... 나머지 옵션 ... */}
        </select>
      </div>

      {/* 필터링된 정비소 목록 렌더링 */}
      <div>
        {filteredCarcenters.map(carcenter => (
          <RepairshopList
            key={carcenter.id}
            id={carcenter.id}
            name={carcenter.name}
            address={carcenter.address}
            buttonText="예약하기"
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
