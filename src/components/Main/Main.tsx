import clsx from "clsx";
import type { FC } from "react";
import style from "./Main.module.scss";
import man from "../../images/man.png";
// import { newCardsData } from "../../service/handlerBD";
// import { bd } from "./bd";
// import { cardsText } from "../../service/constants";
import Form from "../Form/Form";

const Main: FC = () => {
  // console.log(newCardsData(bd, "isPopular", cardsText));
  return (
    <main className={clsx(style.main)}>
      <h1 className={clsx(style.main__title)}>
        Выберите подходящий тарифный план
      </h1>
      <div className={clsx(style.main__wrap)}>
        <img src={man} alt="Спортсмен" className={clsx(style.main__image)} />
        <div className={clsx(style.main__content, style.content)}>
          <Form />
        </div>
      </div>
    </main>
  );
};
export default Main;
