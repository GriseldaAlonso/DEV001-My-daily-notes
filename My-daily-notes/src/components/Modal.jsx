import bxX from "../assets/bxX.svg";

const Modal = ({ children, state, setState, title }) => {
  return (
    <>
      {state && (
        <div className="overlay">
          <div className="modalContainer">
            {title !== '' ? <div className="modalHeader">
              <h3 className="titleModal">{title}</h3>
            </div> : <div className="hide"></div>}
            <button className="btnClose" onClick={()=> setState(false)}>
              <img src={bxX} alt="icon close" />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;