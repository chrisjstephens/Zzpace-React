import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

//HOC To block/restrict access to User component
export default (ComposedComponent) => {
   class RequireAuth extends React.Component {
   //   componentDidMount() {
   //       if (!this.props.token)
   //          this.props.history.push("/login");
   //    }

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

      // componentDidMount() {
      //    console.log('props', this.props);
      // }
  }

  const mapStateToProps = state => ({
    token: state.login.token
  })

  return connect(mapStateToProps, actions)(RequireAuth);

}
