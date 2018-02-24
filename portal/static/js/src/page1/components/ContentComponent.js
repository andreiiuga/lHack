import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col } from 'react-bootstrap';
import uuidV4 from 'uuid/v4';

// App
import 'page1/scss/app.scss';


class ContentComponent extends React.Component {
  renderContent() {
    const { module11 } = this.props;

    return  (
      <Col xs={12} md={12}>
        <h3>
          { module11.get('name') }
        </h3>

        {
          module11.get('content').split('\n').map(text => {
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
    const { module11, dispatch } = this.props;
    return (
      <div>
        <Grid>
            { module11.get('content') ?
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
    module11: state.module11
  }
};

export default connect(mapStateToProps)(ContentComponent);
