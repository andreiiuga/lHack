import React from 'react';
import { connect } from 'react-redux';
import { Button, Alert, Grid, Col, Label } from 'react-bootstrap';
import uuidV4 from 'uuid/v4';

// App
import { getFromServer, notifyServer } from 'page1/redux/modules/module11';
import ContentComponent from './ContentComponent';
import 'page1/scss/app.scss';


class AppComponent extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getFromServer());
  }

  renderNotification() {
    const { module11 } = this.props;
    const renderList = []
    if (module11.get('isNotify')) {
      renderList.push(<div key={uuidV4()}><Label>Notifying server { module11.get('notifyStatus') } (wait 3 seconds)</Label><br /></div>);
    }

    return renderList.concat(module11.get('notifications').map(x => {
      return (
        <Alert bsStyle="success" key={uuidV4()}>
          Notification from server with uuid { x.get('message_uuid') } (disappears in 10s)
        </Alert>
      )
    }))
  }

  render() {
    const { module11, dispatch } = this.props;

    if (!module11.get('isInitialized')) {
      return (
        <div>Loading</div>
      )
    };

    return (
      <div>
        <Grid fluid={true}>
          <Col xs={12} md={12}>
            <h1>
              Page 1
            </h1>
          </Col>

          <Col xs={3} md={2}>
            <Button
              bsStyle="primary"
              onClick={() => {
                dispatch(notifyServer());
              }}>
              Notify Server
            </Button>
          </Col>

          <Col xs={9} md={10}>
            { this.renderNotification() }
          </Col>
        </Grid>

        <hr />

        <ContentComponent />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

const mapStateToProps = (state) => {
  return {
    module11: state.module11
  }
};

export default connect(mapStateToProps)(AppComponent);
