import clsx from "clsx";
import { useEffect, useState, type FC } from "react";
import style from "./Form.module.scss";
import Card from "../Card/Card";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCards, selectPopularCards } from "../../app/reducers/cardsSlice";
import { Spinner } from "../Spinner/Spinner";
import type { TCard } from "../../app/reducers/cardsSlice";

const Form: FC = () => {
  const [privacy, setPrivacy] = useState(true);
  const dispatch = useAppDispatch();
  const popularCards = useAppSelector(selectPopularCards);
  const cardsStatus = useAppSelector(state => state.cards.status);
  const error = useAppSelector(state => state.cards.error);

  useEffect(() => {
    if (cardsStatus === "idle") {
      dispatch(fetchCards());
    }
  }, [cardsStatus, dispatch]);

  let content;

  if (cardsStatus === "loading") {
    content = <Spinner text="Загрузка..." />;
  } else if (cardsStatus === "succeeded") {
    if (popularCards) {
      console.log(popularCards);
      content = popularCards.map((card: TCard) => (
        <Card key={card.id} card={card} />
      ));
    } else {
      content = [];
    }
  } else if (cardsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <form className={clsx(style.content__form, style.form)}>
      <div className={clsx(style.form__cards)}>{content}</div>
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
        <label htmlFor="privacy">
          Я соглашаюсь с <a href="!#">Правилами сервиса</a> и условиями
          <a href="!#">Публичной оферты</a>.
        </label>
      </fieldset>

      <input
        type="submit"
        className={clsx(style.form__submit)}
        id="privacy"
        checked={privacy}
        onChange={() => setPrivacy(state => !state)}
        value="Купить"
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
