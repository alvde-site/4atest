import clsx from "clsx";
import { useRef, type FC } from "react";
import style from "./Popup.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeAllPopups,
  selectPopupState,
} from "../../app/reducers/popupSlice";
import PopupForm from "../PopupForm/PopupForm";

const Popup: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = useAppSelector(selectPopupState);
  const dispatch = useAppDispatch();

  const checkOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    if (ref.current && !ref.current.contains(target)) {
      dispatch(closeAllPopups());
    }
  };

  const closePopup = () => {
    dispatch(closeAllPopups());
  };

  return (
    <div
      className={clsx(style.popup, {
        [style.popup__opened]: isOpen,
      })}
      onClick={checkOutsideClick}
    >
      <div className={clsx(style.popup__container)} ref={ref}>
        <button
          className={clsx(style.popup__close)}
          type="button"
          aria-label="Закрыть"
          onClick={closePopup}
        ></button>
        <p className={clsx(style.popup__promo)}>горящее предложение</p>
        <h2 className={clsx(style.popup__title)}>
          Не упусти свой <span>последний шанс</span>
        </h2>
        <p className={clsx(style.popup__subtitle)}>
          Мы знаем, как трудно начать.. <span>Поэтому!</span>
        </p>
        <p className={clsx(style.popup__present)}>
          Дарим скидку для <span>лёгкого старта</span> 🏃‍♂️
        </p>
        <p className={clsx(style.popup__text)}>
          Посмотри, что мы для тебя приготовили 🔥
        </p>
        <PopupForm />
      </div>
    </div>
  );
};
export default Popup;
