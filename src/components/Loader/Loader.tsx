import { type FC } from "react";
import clsx from "clsx";
import styles from "./Loader.module.scss";

const Loader: FC = () => {
  return <span className={clsx(styles.loader)}></span>;
};

export default Loader;
