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
import { Navigate, Route, useNavigate, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import * as apiAuth from "../utils/ApiAuth";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";

export default function App() {
  const [cards, setCards] = useState([])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isSurePopupOpen, setIsSurePopupOpen] = useState(false)

  const [isHandleCardDelete, setIsHandleCardDelete] = useState("")

  const [currentUser, setCurrentUser] = useState({})

  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [headerEmail, setHeaderEmail] = useState("");

  const navigate = useNavigate();

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
    setIsInfoTooltipPopupOpen(false);
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
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getCards()])
        .then(([dataUserServer, dataCardServer]) => {
          setCurrentUser(dataUserServer)
          setCards(dataCardServer)
        }).catch((err) => console.log(`При добавлении карточек: ${err}`));
    }
  }, [loggedIn])

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

  function onRegister(data) {
    apiAuth
      .signup(data)
      .then((res) => {
        if (res && res.data) {
          setIsInfoTooltipPopup(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopup(false);
        console.log(`При onRegister: ${err}`);
      })
      .finally(() =>
        setIsInfoTooltipPopupOpen(true));
  }

  function onLogin(data) {
    apiAuth
      .signin(data)
      .then((res) => {
        if (res && res.rout) {
          localStorage.setItem("jwt", res.rout);
          setHeaderEmail(data.email);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopup(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(`При onLogin: ${err}`);
      });
  }

  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setHeaderEmail("");
  }

  useEffect(() => {
    function routCheck() {
      const rout = localStorage.getItem("jwt");
      if (rout) {
        apiAuth
          .routCheck(rout)
          .then((res) => {
            if (res && res.user) {
              setLoggedIn(true);
              navigate("/");
              setHeaderEmail(res.user.email);
            }
          })
          .catch((err) => console.log(`При routCheck: ${err}`));
      } else {
        setLoggedIn(false);
      }
    }
    routCheck();
  }, [navigate]);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header loggedIn={loggedIn} email={headerEmail} onSignOut={onSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardSure={handleSureClick}
                onCardLike={handleCardLike}
                cards={cards}
                loggedIn={loggedIn}
                element={Main}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/sign-in"} />}
          />
        </Routes>

        {/* <Header>
        </Header> */}
        <InfoTooltip
          name="infotooltip"
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isStatus={isInfoTooltipPopup}
        />
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

        {/* <Login></Login> */}
        {/* <Register></Register> */}
        {/* <ErrorPopup
          title='Что-то пошло не так!
          Попробуйте ещё раз.'
        ></ErrorPopup> */}
        {/* 
        <DonePopup
          title='Вы успешно зарегистрировались!'></DonePopup> */}

        {/* <InfoTooltip></InfoTooltip> */}

        {/* <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardSure={handleSureClick}
          onCardLike={handleCardLike}
          cards={cards}>
        </Main> */}

        {/* <Footer>
        </Footer> */}
        {loggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider >
  );
}
