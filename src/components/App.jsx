import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import {useEffect, useState} from 'react';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

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
    setSelectedCard({})
  }

  function handleCardClick(card) {
    setSelectedCard({link: card.link, name: card.name})
    setSelectedCard(true)
  } 

  useEffect(() => {
    //  Check if NOT undefined or null
    if (selectedCard !== undefined && selectedCard !== null) {
      console.log(' variable is NOT undefined or null');
    }
  }, [selectedCard]);

  return (
    <div className="page__content">
      <Header>
      </Header>

      <PopupWithForm 
        name = 'redaction' 
        title = 'Редактировать профиль'
        buttonSave= 'Сохранить'
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          minLength={2}
          maxLength={40}
          type="text"
          name="username"
          id="username"
          className="form__input form__input_redaction form__input_kye_username"
          placeholder="Имя"
          required=""
        />
        <span className="form__input-error form__input-error_type_username"/>
        <input
          minLength={2}
          maxLength={200}
          type="text"
          name="status"
          id="status"
          className="form__input form__input_redaction form__input_kye_status"
          placeholder="О себе"
          required=""
        />
        <span className="form__input-error form__input-error_type_status"/>
      </PopupWithForm>

      <PopupWithForm 
        name= 'card-add' 
        title= 'Новое место'
        buttonSave= 'Создать'
        isOpen={isAddPlacePopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          minLength={2}
          maxLength={30}
          type="text"
          name="placename"
          id="placename"
          className="form__input form__input_add form__input_kye_placename"
          placeholder="Название"
          required=""
        />
        <span className="form__input-error form__input-error_type_placename"/>
        <input
          type="url"
          name="placelink"
          id="placelink"
          className="form__input form__input_add form__input_kye_placelink"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="form__input-error form__input-error_type_placelink"/>
      </PopupWithForm>

      <PopupWithForm 
        name= 'sure' 
        title= 'Вы уверены?'
        buttonSave= 'Да'
        
      >
      </PopupWithForm>

      <ImagePopup 
        card={selectedCard}
        isOpen={selectedCard}
        onClose = {closeAllPopups}>       
      </ImagePopup>

      <PopupWithForm
        name= 'change-avatar' 
        title= 'Обновить аватар'
        buttonSave= 'Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          type="url"
          name="avatarlink"
          id="avatarlink"
          className="form__input form__input_change-avatar form__input_kye_avatarlink"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="form__input-error form__input-error_type_avatarlink"/>
      </PopupWithForm>

      <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}>  
      </Main>

      <Footer>
      </Footer>
    </div>
  );
}

export default App;
