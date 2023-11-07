// import { Link } from "react-router-dom";
import { SmallButton } from "../../components/Button";

import { useState } from "react";
import RepairshopList from "./RepairshopList";
import ShopReservation from "./ShopReservation";

function ShopList() {
  return (
    <div
      className="Reservation"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p
        style={{
          color: "#47F6C1",
          textAlign: "left",
        }}
      >
        {" "}
        예약하기 - 정비소 목록
      </p>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 주정비소 컴포넌트 */}
        <RepairshopList />
        <SmallButton
          style={{
            width: "150px",
            marginTop: "5px",
          }}
        >
          주 정비소 등록하기
        </SmallButton>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "50px",
          marginBottom: "10px",
        }}
      >
        {/* 정비소 지역 selectionbox */}
        <label
          htmlFor="local"
          style={{
            color: "#47F6C1",
          }}
        >
          정비소 지역
        </label>
        <select
          id="local"
          style={{
            marginLeft: "10px",
          }}
        >
          <option>서울점</option>
          <option>경기도점</option>
          <option>강원도점</option>
          <option>충청도점</option>
        </select>
      </div>
      <div>
        {/* 정비소목록 */}
        <RepairshopList />
      </div>
    </div>
  );
}

export default ShopList;
