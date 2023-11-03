import './btnNormal.css';

function BtnNormal(props) {
  return(
    <button className="btnCss" onClick={props.onClick}>{props.contents}</button>
  )

  
}

export default BtnNormal;