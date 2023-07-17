import closeIcon from "../../images/icon-close.svg";
export default function ImagePopup({isOpen, card, onClose}) {
  return (      
    <div className={`popup popup_open-size ${isOpen && 'popup_opened'} `}>
      <div className="popup__container popup__container_open-size">
        <button
          type="button"
          className="popup__button-close popup__button-close_open-size"
          onClick={onClose}
        >
        <img
          className="popup__close"
          src={closeIcon}
          alt="крест"
        />
        </button>
        <img 
          className="popup__element-img" 
          src={card.link ? card.link: '#'} 
          alt={card.name}/>
        <h2 className="popup__element-text">{card.name}</h2>
      </div>
    </div>
  );
}
// // Check specifically for null or undefined
// if(financialPerformance === null || financialPerformance === undefined) {
//   // Code...
// }

// // Checking for zero, could be returned ( not sure on your data )
// if(financialPerformance === 0 || financialPerformance) {
//    // Code...
// }


// {
//   financialPerformance && financialPerformance.isConfirmed ? (
//     <L.Text txtGray>Confirmed</L.Text>
//   ) : (
//     <L.Text txtGray>Not Confirmed</L.Text>
//   )
// }