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
    const data_to_send = Object.assign({},
      { filename: contract_helper.uploaded_contract[0].name, content:
        { 
          name: contract_helper.uploaded_contract[0].name,
          lastModified: contract_helper.uploaded_contract[0].lastModified,
          lastModifiedDate: contract_helper.uploaded_contract[0].lastModifiedDate,
          size: contract_helper.uploaded_contract[0].size,
          type: contract_helper.uploaded_contract[0].type,
          webkitRelativePath: contract_helper.uploaded_contract[0].webkitRelativePath,
        }
      });
    dispatch(uploadFile(data_to_send));
  }

  render() {
    const { contract_helper, dispatch } = this.props;


    return (
      <div>
        <Grid fluid={true}>
          <Col xs={12} md={12}>
            <h1>
              Contract Helper
            </h1>
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
                  Upload {!contract_helper.isInitialized && <i className="fas fa-circle-notch fa-spin"></i>}
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
    contract_helper: state.contract_helper.toJS()
  }
};

export default connect(mapStateToProps)(AppComponent);
