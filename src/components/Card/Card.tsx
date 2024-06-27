import clsx from "clsx";
import type { FC } from "react";
import style from "./Card.module.scss";
import type { TCard } from "../../app/reducers/cardsSlice";

export interface ICard {
  card: TCard;
}

const Card: FC<ICard> = ({ card }) => {
  return (
    <div className={clsx(style.form__card, style.card)}>
      <div className={clsx(style.card__rate, style.rate)}>
        <span className={clsx(style.rate__percent)}>{card.percent}</span>
      </div>
      <h2 className={clsx(style.card__title)}>{card.name}</h2>
      <p className={clsx(style.card__price)}>{`${card.price}₽`}</p>
      <p className={clsx(style.card__discount)}>{`${card.basePrice}₽`}</p>
    </div>
  );
};
export default Card;
