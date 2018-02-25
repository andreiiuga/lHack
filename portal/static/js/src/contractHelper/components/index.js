import React from 'react';
import { connect } from 'react-redux';
import { Button, Alert, Grid, Col, Label } from 'react-bootstrap';
import uuidV4 from 'uuid/v4';

// App
import { addFile, uploadFile } from 'contractHelper/redux/modules/contract_helper';
import ContentComponent from './ContentComponent';
import 'contractHelper/scss/app.scss';


class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddFile = this.handleAddFile.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  handleAddFile(e) {
    const { dispatch } = this.props;
    dispatch(addFile(e.target.files));
  }

  handleUploadFile() {
    const { dispatch, contract_helper } = this.props;
    const data_to_send = 
      contract_helper.uploaded_contract[0];
    dispatch(uploadFile(data_to_send));
  }

  render() {
    const { contract_helper, dispatch, isInitialized } = this.props;
    console.log(isInitialized);


    return (
      <div style={{backgroundColor: 'whitesmoke', minHeight: '660px', paddingBottom: '50px'}}>
        <Grid fluid={true}>
          <Col xs={12} md={12}>
            <h3>
              Contract Helper
            </h3>
          </Col>

          <Col xs={12} md={12}>
            <div className="upload-wrapper">
              <input
                type="file"
                name="contract-upload"
                id="singleFile"
                onChange={this.handleAddFile}
              />
              <Button
                bsStyle="primary"
                onClick={() => {
                  this.handleUploadFile();
                }}>
                <div>
                  Upload
                  {isInitialized ?
                  <span>
                    {
                      isInitialized === 'req' ?
                        <i className="fas fa-circle-notch fa-spin"></i>:
                        <i className="fas fa-check"></i>
                    }
                  </span> : ''}
                </div>
              </Button>
            </div>
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
    contract_helper: state.contract_helper.toJS(),
    isInitialized: state.contract_helper.get('isInitialized')
  }
};

export default connect(mapStateToProps)(AppComponent);
