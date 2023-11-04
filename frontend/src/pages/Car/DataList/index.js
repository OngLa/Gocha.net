import Card from "../../../components/Card";
import ContentHeader from "../../../components/ContentHeader";

function DataList() {
  return (
    <>
      <ContentHeader menuName="예약관리" />

      <div className="CardList">
        <Card
          title_children={
            <>
              <div>날짜 : </div>
              <div style={{ marginLeft: "5px" }}>2023-11-08</div>
            </>
          }
          content_children="abcdefghijklmnopqrstuvwxyz"
        />
      </div>
    </>
  );
}

export default DataList;
