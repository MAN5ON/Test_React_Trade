import React, { useEffect, useMemo, useState } from 'react'

import { TradeTemp } from './components/tradeTemp';
import { CompanyCard } from './components/companyCard';
import s from './components/styles/appStyle.module.css'

function App() {
  const [trade, setTrade] = useState(false)
  const [turn, changeTurn] = useState(0)
  const [timer, setTimer] = useState(2 * 60)

  const min = Math.floor(timer / 60)
  const sec = timer - min * 60
  //Массив объектов, имитирующий участников торгов.
  const participants = useMemo(() => {
    return [
      { isOnPage: true, name: 'Участник 1', time: '80', warranty: '24', percent: '30', cost: '3 000 000' },
      { isOnPage: true, name: 'Участник 2', time: '90', warranty: '24', percent: '100', cost: '2 500 000' },
      { isOnPage: false, name: 'Участник 3', time: '75', warranty: '22', percent: '60', cost: '2 650 000' },
      { isOnPage: true, name: 'Участник 4', time: '120', warranty: '36', percent: '50', cost: '3 200 000' },
      { isOnPage: false, name: 'Участник 5', time: '100', warranty: '30', percent: '40', cost: '2 450 000' }
    ]
  }, [])

  //функция-хэндл старта торгов
  const handleStart = () => {
    setTrade(true)
    changeTurn(1)
    participants[turn].showTimer = true

  }
  //функция-хэндл завершения торгов
  const handleEnd = () => {
    setTrade(false)
    setTimer(2 * 60)
    delete participants[turn - 1].showTimer
    changeTurn(0)
  }

  useEffect(() => {
    //таймер обратного отсчёта
    const interval = setInterval(() => {
      trade && setTimer((timer) => (timer >= 1 ? timer - 1 : 0))
    }, 1000)

    //обработка обновления счетчика с привязкой очереди к окну компании
    if (timer === 0) {
      if (turn < participants.length - 1) {
        changeTurn(turn => turn + 1)
      } else {
        changeTurn(0)
      }
      participants[turn].showTimer = true
      if (turn === 0) {
        delete participants[participants.length - 1].showTimer
      } else {
        delete participants[turn - 1].showTimer
      }
      setTimer(2 * 60)
    }
    return () => {
      clearInterval(interval)
    }
  }, [trade, timer, participants, turn])
  
  const props = { min, sec }

  return (
    <div className={s.app}>
      <div className={s.information}>
        <TradeTemp />
        {
          participants.map(participant => (
            <CompanyCard key={participant.name} {...participant} props={props} />
          ))
        }
      </div>

      {trade === false ?
        <div className={s.buttons}>
          <button className={s.start} onClick={handleStart}>Начать торги</button>
        </div>
        :
        <div className={s.buttons}>
          <button className={s.update} onClick={() => setTimer(0)}>Обновить</button>
          <button className={s.end} onClick={handleEnd}>Завершить торги</button>
        </div>
      }
    </div>
  );
}

export default App;
