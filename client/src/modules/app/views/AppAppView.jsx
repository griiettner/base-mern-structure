// @flow
import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import AppNavbarView from './AppNavbarView';
import { historyHelper as history } from '../../../helpers';
import { AlertAlertActions } from '../../alert/actions';
import { RouteAppView as PrivateRoute, DefaultAppView as HomePage } from '..';
import { RegisterUsersComponent as RegisterPage, LoginUsersComponent as LoginPage } from '../../users';

import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  alert: {
    message: string,
    type: string
  },
  dispatch: Function
};

const alertActions: Function = new AlertAlertActions();

class AppAppView extends React.Component<Props> {
  componentWillMount(): void {
    history.listen(() => {
      // clear alert on location change
      this.props.dispatch(alertActions.clear());
    });
  }

  render(): React$Node {
    const { alert } = this.props;
    return [
      <section key="AppAppView1" id="mainNav">
        <Router history={history}>
          <AppNavbarView />
        </Router>
      </section>,
      <section key="AppAppView2" id="mainContent">
        <Container>
          <Row>
            <Col sm={{ size: 8, offset: 2 }}>
              {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
              <Router history={history}>
                <div>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                </div>
              </Router>
            </Col>
          </Row>
        </Container>
      </section>
    ];
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(AppAppView);
export default connectedApp;
