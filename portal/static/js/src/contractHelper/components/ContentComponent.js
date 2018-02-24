import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col } from 'react-bootstrap';
import uuidV4 from 'uuid/v4';

// App
import 'contractHelper/scss/app.scss';


class ContentComponent extends React.Component {
  renderContent() {
    const { contract_helper } = this.props;

    return  (
      <Col xs={12} md={12}>
        <h3>
          { contract_helper.get('name') }
        </h3>

        {
          contract_helper.get('content').split('\n').map(text => {
              return (
                <span key={uuidV4()}>
                  { text}
                  <br />
                </span>
              )
            })
        }
      </Col>
    )
  }

  render() {
    const { contract_helper, dispatch } = this.props;
    return (
      <div>
        <Grid>
            { contract_helper.get('content') ?
              this.renderContent() :
              <Col xs={12} md={12}>No content found</Col>
            }
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
