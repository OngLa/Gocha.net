import Card from "../../../components/Card";

function DataList() {
  return (
    <>
      <Card
        title_children={
          <>
            <div>날짜 : </div>
            <div style={{marginLeft: "5px"}}>2023-11-08</div>
          </>
        }
        content_children="abcdefghijklmnopqrstuvwxyz"
      />
    </>
  )
}

export default DataList;