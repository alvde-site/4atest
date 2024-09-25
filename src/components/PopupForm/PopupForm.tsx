import clsx from "clsx";
import { type FormEvent, useEffect, useState, type FC } from "react";
import style from "./PopupForm.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCards, selectDiscountCards } from "../../app/reducers/cardsSlice";
import Loader from "../Loader/Loader";
import type { TCard } from "../../app/reducers/cardsSlice";
import PopupCard from "../PopupCard/PopupCard";
import { closeAllPopups } from "../../app/reducers/popupSlice";

const PopupForm: FC = () => {
  const [privacy, setPrivacy] = useState(true);
  const dispatch = useAppDispatch();
  const discountCards = useAppSelector(selectDiscountCards);

  const cardsStatus = useAppSelector(state => state.cards.status);
  const error = useAppSelector(state => state.cards.error);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(closeAllPopups());
  };

  useEffect(() => {
    if (cardsStatus === "idle") {
      dispatch(fetchCards());
    }
  }, [cardsStatus, dispatch]);

  let content;

  if (cardsStatus === "loading") {
    content = <Loader />;
  } else if (cardsStatus === "succeeded") {
    if (discountCards) {
      content = discountCards.map((card: TCard) => (
        <PopupCard key={card.id} card={card} />
      ));
    }
  } else if (cardsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <form
      className={clsx(style.content__form, style.form)}
      onSubmit={handleSubmit}
    >
      <div className={clsx(style.form__cards)}>{content}</div>
      <input
        type="submit"
        className={clsx(style.form__submit)}
        id="privacy"
        checked={privacy}
        onChange={() => setPrivacy(state => !state)}
        value="Начать тренироваться"
      />
    </form>
  );
};
export default PopupForm;
