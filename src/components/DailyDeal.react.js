import React from 'react';

export default class DailyDeal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dailyDealError: false
    }

    this.initData();
  }

  initData() {
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/api/dailyDeals")
      .then(res => res.json())
      .then(
        (result) => this.setState({ data: result }),
      ).catch((error) => {
        this.setState({dailyDealError : true})
      });
  }

  render() {
    const cssAlertType = this.state.data.type === 'NoDeal' ? 'alert-danger' : 'alert-info';

    return (
      <div>
        <h1>Today's Deal!</h1>
        {!this.state.dailyDealError ?
          <div className={"alert " + cssAlertType }>
            {this.state.data.title}
          </div>
        : null}
      </div>
    );

  }

}
