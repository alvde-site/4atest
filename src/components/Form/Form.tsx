import clsx from "clsx";
import { type FormEvent, useEffect, useRef, useState, type FC } from "react";
import style from "./Form.module.scss";
import Card from "../Card/Card";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCards,
  resetCardsStatus,
  selectPopularCards,
} from "../../app/reducers/cardsSlice";
import Loader from "../Loader/Loader";
import type { TCard } from "../../app/reducers/cardsSlice";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Form: FC = () => {
  const button = useRef(null);
  const [privacy, setPrivacy] = useState(true);
  const [isBackup, setIsBackup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleBackup = () => {
    setIsBackup(true);
    dispatch(resetCardsStatus());
    dispatch(fetchCards(true));
  };
  const dispatch = useAppDispatch();
  const popularCards = useAppSelector(selectPopularCards);

  const cardsStatus = useAppSelector(state => state.cards.status);
  const error = useAppSelector(state => state.cards.error);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    gsap.fromTo(
      button.current,
      { opacity: 1 },
      { opacity: 0.3, duration: 0.5, repeat: -1, yoyo: true },
    );
  });

  useEffect(() => {
    if (cardsStatus === "idle") {
      dispatch(fetchCards(isBackup));
    }
    if (cardsStatus === "loading") {
      setIsLoading(true);
    }
    if (cardsStatus === "succeeded" || cardsStatus === "failed") {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [cardsStatus, dispatch, isBackup]);

  let content;

  if (cardsStatus === "loading" || isLoading) {
    content = <Loader />;
  } else if (cardsStatus === "succeeded") {
    if (popularCards) {
      content = (
        <div className={clsx(style.form__cards)}>
          {popularCards.map((card: TCard) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      );
    }
  } else if (cardsStatus === "failed") {
    content = (
      <>
        <p
          className={clsx(style.form__info)}
        >{`Что-то карточки не загружаются😕. ${error}. Но можно запустить имитацию загрузки с сервера.`}</p>
        <button onClick={handleBackup} className={clsx(style.form__submit)}>
          ⤷ Запустить
        </button>
      </>
    );
  }

  return (
    <form
      className={clsx(style.content__form, style.form)}
      onSubmit={handleSubmit}
    >
      {content}
      <p className={clsx(style.form__info)}>
        Следуя плану на 3 месяца, люди получают в 2 раза лучший результат, чем
        за 1 месяц
      </p>
      <fieldset className={clsx(style.form__fieldset)}>
        <input
          type="checkbox"
          className={clsx(style.form__checkbox)}
          id="privacy"
          checked={privacy}
          onChange={() => setPrivacy(state => !state)}
        />
        <label htmlFor="privacy" className={clsx(style.form__label)}>
          Я соглашаюсь с{" "}
          <a className={clsx(style.form__link)} href="!#">
            Правилами сервиса
          </a>{" "}
          и условиями
          <a className={clsx(style.form__link)} href="!#">
            {" "}
            Публичной оферты
          </a>
          .
        </label>
      </fieldset>

      <input
        type="submit"
        className={clsx(style.form__submit)}
        id="privacy"
        checked={privacy}
        onChange={() => setPrivacy(state => !state)}
        value="Купить"
        ref={button}
      />
      <p className={clsx(style.form__privacy)}>
        Нажимая «Купить», Пользователь соглашается на автоматическое списание
        денежных средств по истечению купленного периода. Дальнейшие списания по
        тарифам участвующим в акции осуществляются по полной стоимости согласно
        оферте.
      </p>
    </form>
  );
};
export default Form;
