import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Modal } from 'react-bootstrap';
import uuidV4 from 'uuid/v4';
import { getInfo, openModal } from 'contractHelper/redux/modules/contract_helper';


// App
import 'contractHelper/scss/app.scss';

const PreviewSentencesPopup = ({ isOpen, title, data, onClose, initialized }) => (
  <Modal show={isOpen} bsSize="large" onHide={onClose}>

    <Modal.Header closeButton={true}>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
    {
      
      initialized === true ? (data.map(item => {
        console.log(item);
        return <span>{
          item.map(item2 => {
            <span>{item2}</span>
          })
        }</span>
      })) : <i className="fas fa-circle-notch fa-spin"></i>
    } 
    </Modal.Body>

  </Modal>
);


class ContentComponent extends React.Component {
  render() {
    const { sentences, highlight, isInitialized, fileName , isModalOpen, initialized_info, info_data } = this.props;
    console.log(info_data);
    const render_str = sentences.map((sent,key) => {
      const sent_light_idx = highlight.get(key);
      var hightlight_words = [];
      sent_light_idx.map(h_light => {
        hightlight_words.push(sent.substring(h_light.get(0),h_light.get(1)))
      })
      const split = sent.split('__NL__MARKER__');
      var children = [];
      split.map((piece,key) => {
      var idx = 0;
        hightlight_words.map(word => {
          if (piece.includes(word)) {
            children.push(<span key={uuidV4()}>{piece.substring(idx,piece.indexOf(word))}</span>);
            children.push(
              <span onClick={() => this.props.dispatch(getInfo({query: word}))} style={{ backgroundColor: 'yellow'}} key={uuidV4()}>
                {word}
              </span>
            );
            idx = piece.indexOf(word) + word.length;
            piece = piece.substr(idx);
            idx = 0;
          }
        })

        children.push(<span key={uuidV4()}>{piece.substring(idx,piece.length)}</span>);
        children.push(<br key={uuidV4()}/>)
      })
      return children;
    })

    return (
      <div>
      {
        isInitialized === 'succ' ?
        <Col xs={12} md={12}>
          <div className="doc-wrapper">
            <div className="doc-title">{fileName[0].name.substr(0, fileName[0].name.lastIndexOf("."))}</div>
            {render_str.map((sent,key) => {
              return <span key={key}>{sent}</span>
            })}
          </div>
        </Col> :
        ''
      }
        <div>
          <PreviewSentencesPopup
            isOpen={isModalOpen}
            onClose={() => this.props.dispatch(openModal(false))}
            title="Legislation"
            initialized={initialized_info}
            data={info_data}
          />
        </div>
      </div>
    );
  }
}

ContentComponent.defaultProps = {
};

const mapStateToProps = (state) => {
  return {
    sentences: state.contract_helper.get('sentences'),
    highlight: state.contract_helper.get('highlight'),
    isInitialized: state.contract_helper.get('isInitialized'),
    fileName: state.contract_helper.get('uploaded_contract'),
    isModalOpen: state.contract_helper.get('isModalOpen'),
    initialized_info:state.contract_helper.get('initialized_info'),
    info_data: state.contract_helper.get('info_data')
  }
};

export default connect(mapStateToProps)(ContentComponent);
