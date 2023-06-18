import React, { useState, useEffect } from 'react';

export default function DailyDeal() {
  const [data, setData] = useState([]);
  const [dailyDealError, setDailyDealError] = useState(false);
  const cssAlertType = data === 'NoDeal' ? 'alert-danger' : 'alert-info';

  useEffect(() => {
    // Todo: cache in localstorage or redux to reduce pageloads
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/dailyDeals")
      .then(res => res.json())
      .then(
        (result) => setData(result),
      ).catch((error) => {
        setDailyDealError(true)
      });
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
