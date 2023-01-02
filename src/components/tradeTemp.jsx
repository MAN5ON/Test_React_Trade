import React from "react";

import s from "./styles/tradeTempStyle.module.css";

export const TradeTemp = () => {
  return (
    <ul className={s.tradeTemp}>
      <li className={s.main}>Ход :</li>
      <li className={s.second}>Наименование компании: </li>
      <li className={s.first}>Срок изготовления лота: </li>
      <li className={s.second}>Гарантийные обстоятельства: </li>
      <li className={s.first}>Условия оплаты:</li>
      <li className={s.second}>Стоимость: </li>
    </ul>
  );
};
