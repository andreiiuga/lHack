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
    console.log(e.target.files[0])
    const { dispatch } = this.props;
    dispatch(addFile(e.target.files[0]));
  }

  handleUploadFile() {
    const { dispatch, contract_helper } = this.props;
    const data_to_send = {name: contract_helper.file.name, content: contract_helper.file}
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

          <Col xs={3} md={2}>
            <input
              type="file"
              name="contract-upload"
              id="singleFile"
              onChange={this.handleAddFile}
            />
            <Button
              bsStyle="primary"
              onClick={() => {
                dispatch(this.handleUploadFile());
              }}>
              Upload
            </Button>
          </Col>
          <Col xs={1} md={1}>
            {!contract_helper.isInitialized && <div>Loading</div>}
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
