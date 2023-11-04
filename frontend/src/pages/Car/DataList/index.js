import Card from "../../../components/Card";
import ContentHeader from "../../../components/ContentHeader";
import LargeButton from "../../../components/Button";

function DataList() {
  return (
    <div>
      <ContentHeader menuName="예약관리" />
      <LargeButton
        name="update"
        children="최신 데이터 업데이트"
        onClick={() => {
          console.log("클릭");
        }}
      />
      <div className="CardList">
        <Card
          title_children={
            <>
              <div>날짜 : </div>
              <div style={{ marginLeft: "5px" }}>2023-11-08</div>
            </>
          }
          content_children="sdlkafjasdklfjsadlkfjkldsjfkdsa"
        />
      </div>
    </div>
  );
}

export default DataList;
