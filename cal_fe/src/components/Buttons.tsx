
type ButtonsProps = {
  op: any;
  onClick: (op: any) => void;
}

const Buttons = (props : ButtonsProps) => {
  const handleClick = () => {
    props.onClick(props.op);
  }
  return (
    <button value={props.op} onClick={handleClick} className='btn btn-secondary fw-bold m-2' type='button' style={{width:"50px", height:"50px"}}>
    {props.op}
    </button>
  )
}

export default Buttons