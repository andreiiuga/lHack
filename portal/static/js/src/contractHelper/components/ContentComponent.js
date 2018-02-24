import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col } from 'react-bootstrap';
import uuidV4 from 'uuid/v4';

// App
import 'contractHelper/scss/app.scss';


class ContentComponent extends React.Component {
  render() {
    const { contract_helper, dispatch } = this.props;
    return (
      <div>
        <Grid fluid={true}>
          <Col xs={12} md={12}><h3></h3></Col>
        </Grid>
      </div>
    );
  }
}

ContentComponent.defaultProps = {
};

const mapStateToProps = (state) => {
  return {
    contract_helper: state.contract_helper
  }
};

export default connect(mapStateToProps)(ContentComponent);
