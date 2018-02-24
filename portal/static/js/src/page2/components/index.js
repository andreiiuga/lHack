import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col } from 'react-bootstrap';

// App
import { getFromServer } from 'page2/redux/modules/module1';
import ContentComponent from './ContentComponent';

import 'page2/scss/app.scss';


class AppComponent extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getFromServer());
  }

  render() {
    return (
      <div>
        <Grid fluid={true}>
          <Col xs={12} md={12}>
            <h1>
              Page 2
            </h1>
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
    page2: state.page2
  }
};

export default connect(mapStateToProps)(AppComponent);
