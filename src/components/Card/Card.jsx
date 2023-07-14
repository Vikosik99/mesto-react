export default function Card({ card, onCardClick}) {
  return (
    <article className="element">
      <button type="button" className="element__delete"/>
      <img 
        src={card.link} 
        alt={card.name} 
        className="element__img" 
        onClick={() => onCardClick({link: card.link, name: card.name })} 
      />
      <div className="element__mesto">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-container">
          <button type="button" className="element__like element__like_active"/>
          <span className="element__like-text"/>
        </div>
      </div>
    </article>
  );
}