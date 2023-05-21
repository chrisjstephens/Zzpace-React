import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

//HOC To block/restrict access to User component
const HighOrderComponent = (ComposedComponent) => {
   class RequireAuth extends React.Component {

     render() {
               return (
                  <div>
                  {this.props.token ? 
                     <ComposedComponent { ...this.props } />
                     :
                     this.props.history.push("/login")
                  }
                  </div>
               )
      }
  }

  const mapStateToProps = state => ({
    token: state.login.token
  })

  return connect(mapStateToProps, actions)(RequireAuth);
}

export default HighOrderComponent;