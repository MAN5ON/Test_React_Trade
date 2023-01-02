import React from "react";

import s from "./styles/compCardStyle.module.css";

export const CompanyCard = ({
  showTimer,
  isOnPage,
  name,
  time,
  warranty,
  percent,
  cost,
  props,
}) => {
  return (
    <div className={s.compCard}>
      <div className={s.main}>
        {showTimer === true ? (
          <div className={s.timer}>
            0{props.min} : {props.sec < 10 ? "0" + props.sec : props.sec}
          </div>
        ) : null}
      </div>
      <div className={s.second}>
        {isOnPage === true ? "✅" : null}
        {name}
      </div>
      <div className={s.first}>{time} дней</div>
      <div className={s.second}>{warranty} мес.</div>
      <div className={s.first}>{percent} %</div>
      <div className={s.second}>{cost} руб.</div>
    </div>
  );
};
