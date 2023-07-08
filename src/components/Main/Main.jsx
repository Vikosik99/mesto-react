import { useEffect, useState } from "react"
import profilePencil from "../../images/vector-pencil.svg"
import profilePluse from "../../images/vector-plus.svg"
import api from "../../utils/api"
import Card from "../Card/Card.jsx"


   export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userName, setUserName] = useState('')
  const [userDescription , setuserDescription ] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [serverCard, setServerCard] = useState([])

  

useEffect(() => {
  Promise.all([api.getInitialCards(), api.getCards()])
  .then(([dataUserServer, dataCardServer]) => {
      setuserDescription(dataUserServer.about)
      setUserAvatar(dataUserServer.avatar)
      setUserName(dataUserServer.name)
    dataCardServer.forEach((element) => (element.userid = dataUserServer._id)); // Реализация определения id юзера
      setServerCard(dataCardServer)
    });
  }, [])

    return (    <main className="content">
    <section className="profile">
      <div className="profile__card">
        <button type="button" className="profile__avatar-button" onClick={onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="аватар" />
        </button>
        <div className="profile__info">
          <div className="profile__flex">
            <h1 className="profile__username">{userName}</h1>
            <button type="button" className="profile__button-edit" onClick={onEditProfile}>
              <img
                className="profile__pencil"
                src={profilePencil}
                alt="ручка"
              />
            </button>
          </div>
          <p className="profile__status">{userDescription}</p>
        </div>
      </div>
      <button type="button" className="profile__button-pluse" onClick={onAddPlace}>
        <img
          className="profile__pluse"
          src={profilePluse}
          alt="плюс"
        />
      </button>
    </section>
    <section className="elements" >
      {serverCard.map(data => {
        return( <Card 
          card={data} 
          onCardClick={onCardClick}
          key={data._id}
          />)
      })}
    </section>
  </main>)
}

          // <dev key={data.id} ></dev>)

