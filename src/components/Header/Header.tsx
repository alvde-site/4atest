import clsx from "clsx";
import { useEffect, useRef, useState, type FC } from "react";
import style from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DANGER,
  selectTimerState,
  setTimerState,
  STOPPED,
} from "../../app/reducers/timerSlice";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { openPopup } from "../../app/reducers/popupSlice";

const Header: FC = () => {
  const timer = useRef(null);
  const [counter, setCounter] = useState(120);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handleTime = (num: number) => (num > 9 ? num : "0" + num);
  const timerState = useAppSelector(selectTimerState);
  const dispatch = useAppDispatch();

  const tl = useRef(gsap.timeline({ paused: true }));
  useGSAP(() => {
    tl.current.to(timer.current, {
      opacity: 0.3,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
    });
  });

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (counter === 30) {
      dispatch(setTimerState({ timerState: DANGER }));
      tl.current.play();
    }
    if (counter === 0) {
      dispatch(setTimerState({ timerState: STOPPED }));
      tl.current.pause(0);
      setIsOpenPopup(true);
    }
    if (counter > 0) {
      timeoutId = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [counter, dispatch]);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (isOpenPopup) {
      timeoutId = setTimeout(() => dispatch(openPopup()), 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [dispatch, isOpenPopup]);

  return (
    <header className={clsx(style.header)}>
      <div className={clsx(style.header__timer, style.timer)}>
        <span className={clsx(style.timer__text)}>Скидка действует:</span>
        <div className={clsx(style.timer__clock, style.clock)}>
          <div
            className={clsx(
              style.clock__numbers,
              style[`clock__numbers-${timerState}`],
            )}
            ref={timer}
          >
            <span className={clsx(style.clock__number)}>
              {handleTime(Math.floor(counter / 60))}
            </span>
            <span className={clsx(style.clock__separator)}>:</span>
            <span className={clsx(style.clock__number)}>
              {handleTime(counter % 60)}
            </span>
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
