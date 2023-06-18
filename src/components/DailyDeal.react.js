import React, { useState, useEffect } from 'react';

export default function DailyDeal() {
  const [data, setData] = useState([]);
  const [dailyDealError, setDailyDealError] = useState(false);
  const cssAlertType = data === 'NoDeal' ? 'alert-danger' : 'alert-info';

  useEffect(() => {
    const dailyDealData = localStorage.getItem("dailyDeal");

    if (!dailyDealData) {
      fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/dailyDeals")
        .then(res => res.json())
        .then(
          (result) => {
            setData(result)
            localStorage.setItem("dailyDeal", JSON.stringify(result));
          },
        ).catch((error) => {
          setDailyDealError(true)
          localStorage.removeItem("dailyDeal");
        });
    } else {
      setData(JSON.parse(dailyDealData));
    }
  }, []);

    return (
      <div>
        <h1>Today's Deal!</h1>
        {!dailyDealError ?
          <div className={"alert " + cssAlertType }>
            {data.title}
          </div>
        : null}
      </div>
    );
    
}
