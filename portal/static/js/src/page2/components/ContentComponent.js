import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col } from 'react-bootstrap';
import 'page2/scss/app.scss';


class ContentComponent extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Col xs={12} md={12}>
            Page 2 Content
          </Col>
        </Grid>
      </div>
    );
  }
}

ContentComponent.defaultProps = {
};

const mapStateToProps = (state) => {
  return {
    page2: state.page2
  }
};

export default connect(mapStateToProps)(ContentComponent);
