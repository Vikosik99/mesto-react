import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useEffect, useState } from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";


function App() {
  const [cards, setCards] = useState([])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isSurePopupOpen, setIsSurePopupOpen] = useState(false)

  const [isHandleCardDelete, setIsHandleCardDelete] = useState("")

  const [currentUser, setCurrentUser] = useState({})

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsSurePopupOpen(false)
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard({ link: card.link, name: card.name })
  }

  function handleSureClick(id) {
    setIsHandleCardDelete(id)
    setIsSurePopupOpen(true)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    }).catch(error => console.log(error));
  }

  function handleDeleteClick(event) {
    event.preventDefault()
    api.deleteCard(isHandleCardDelete)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== isHandleCardDelete
        }))
        closeAllPopups()
      }).catch((err) => console.log(`При удалении карточки: ${err}`));
  }

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getCards()])
      .then(([dataUserServer, dataCardServer]) => {
        setCurrentUser(dataUserServer)
        setCards(dataCardServer)
      }).catch((err) => console.log(`При добавлении карточек: ${err}`));
  }, [])

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      }).catch((err) => console.log(`При добавлении исходных имени и статуса: ${err}`));
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(`При обновлении аватара: ${err}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.createNewCard({ name, link })
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      }).catch((err) => console.log(`При добавлении новых карточек: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header>
        </Header>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}>
        </EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}>
        </AddPlacePopup>

        <PopupWithForm
          name='sure'
          title='Вы уверены?'
          buttonSave='Да'
          isOpen={isSurePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteClick}
        >
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}>
        </ImagePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        >
        </EditAvatarPopup>

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardSure={handleSureClick}
          onCardLike={handleCardLike}
          cards={cards}>
        </Main>

        <Footer>
        </Footer>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
