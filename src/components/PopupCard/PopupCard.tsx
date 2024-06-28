import clsx from "clsx";
import type { FC } from "react";
import style from "./PopupCard.module.scss";
import type { ICard } from "../Card/Card";

const PopupCard: FC<ICard> = ({ card }) => {
  return (
    <label className={clsx(style.card)}>
      <input
        className={clsx(style.card__input)}
        type="radio"
        name="tariff"
        value={card.name}
      />
      <div className={clsx(style.card__details)}>
        <h2 className={clsx(style.card__title)}>{card.name}</h2>
        <div className={clsx(style.card__prices)}>
          <p className={clsx(style.card__discount)}>{`${card.basePrice}₽`}</p>
          <span className={clsx(style.card__line)}></span>
          <div className={clsx(style.card__pricewrap)}>
            <p className={clsx(style.card__price)}>{`${card.price}₽`}</p>
            <div className={clsx(style.card__rate, style.rate)}>
              <span
                className={clsx(style.rate__percent)}
              >{`-${card.percent}%`}</span>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
};
export default PopupCard;
