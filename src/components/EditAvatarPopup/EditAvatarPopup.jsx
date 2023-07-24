import { useRef } from "react"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const input = useRef()

    function handleSubmit(event) {
        event.preventDefault()
        onUpdateAvatar({ avatar: input.current.value })
    }
    return (
        <PopupWithForm
            name='change-avatar'
            title='Обновить аватар'
            buttonSave='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onUpdateAvatar={handleSubmit}
        >
            <input
                ref={input}
                type="url"
                name="avatarlink"
                id="avatarlink"
                className="form__input form__input_change-avatar form__input_kye_avatarlink"
                placeholder="Ссылка на картинку"
                required=""
            />
            <span className="form__input-error form__input-error_type_avatarlink"></span>
        </PopupWithForm>
    )
}