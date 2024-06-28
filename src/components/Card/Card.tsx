import clsx from "clsx";
import { useRef, type FC } from "react";
import style from "./Card.module.scss";
import type { TCard } from "../../app/reducers/cardsSlice";
import { useAppSelector } from "../../app/hooks";
import {
  DANGER,
  selectTimerState,
  STOPPED,
} from "../../app/reducers/timerSlice";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface ICard {
  card: TCard;
}

const Card: FC<ICard> = ({ card }) => {
  const refPercent = useRef(null);
  const timerState = useAppSelector(selectTimerState);
  const tl = useRef(gsap.timeline({ paused: true }));

  useGSAP(
    () => {
      tl.current.to(refPercent.current, {
        scale: 1.3,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: refPercent },
  );

  if (timerState === DANGER) {
    tl.current.play();
  }
  if (timerState === STOPPED) {
    tl.current.pause(0);
  }

  return (
    <label className={clsx(style.card)}>
      <input
        className={clsx(style.card__input)}
        type="radio"
        name="tariff"
        value={card.name}
      />
      <div className={clsx(style.card__details)}>
        <div
          className={clsx(
            style.card__rate,
            style[`card__rate-${timerState}`],
            style.rate,
          )}
          ref={refPercent}
        >
          <span
            className={clsx(style.rate__percent)}
          >{`-${card.percent}%`}</span>
        </div>
        <h2 className={clsx(style.card__title)}>{card.name}</h2>
        <div className={clsx(style.card__prices)}>
          <p className={clsx(style.card__price)}>
            {timerState === STOPPED ? `${card.basePrice}₽` : `${card.price}₽`}
          </p>
          <p
            className={clsx(
              style.card__discount,
              style[`card__discount-${timerState}`],
            )}
          >{`${card.basePrice}₽`}</p>
        </div>
        <p className={clsx(style.card__slogan)}>{card.slogan}</p>
      </div>
    </label>
  );
};
export default Card;
