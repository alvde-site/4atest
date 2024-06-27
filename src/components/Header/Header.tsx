import clsx from "clsx";
import type { FC } from "react";
import style from "./Header.module.scss";

const Header: FC = () => {
  return (
    <header className={clsx(style.header)}>
      <div className={clsx(style.header__timer, style.timer)}>
        <span className={clsx(style.timer__text)}>Скидка действует:</span>
        <div className={clsx(style.timer__clock, style.clock)}>
          <div className={clsx(style.clock__numbers)}>
            <span className={clsx(style.clock__number)}>00</span>
            <span className={clsx(style.clock__separator)}>:</span>
            <span className={clsx(style.clock__number)}>00</span>
          </div>
          <div className={clsx(style.clock__description)}>
            <span className={clsx(style.clock__text)}>минут</span>
            <span className={clsx(style.clock__text)}>секунд</span>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
