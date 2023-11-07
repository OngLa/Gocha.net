import ContentHeader from "../../components/ContentHeader";
import Registration from "./Registration";

function MainRepairshop() {

  const carcenters = [
    { id: 1, name: "정비소 A", address: "등록하기 누르면 post 데이터 넘어감" },
    { id: 2, name: "정비소 B", address: "정비소 B에 대한 설명" },
    { id: 3, name: "정비소 C", address: "정비소 C에 대한 설명" },
    { id: 4, name: "정비소 D", address: "정비소 D에 대한 설명" },
  ];

  return (
    <div className="MainRepairshop">
     <ContentHeader menuName="예약관리"/>

      {carcenters.map((carcenter) => (
        <Registration
          key={carcenter.id} // React 리스트에서 고유한 key prop 필요
          id={carcenter.id}
          name={carcenter.name}
          address={carcenter.address}
        />
      ))}
    </div>
  );
}
export default MainRepairshop;
