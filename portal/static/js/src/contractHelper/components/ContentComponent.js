import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col } from 'react-bootstrap';
import uuidV4 from 'uuid/v4';

// App
import 'contractHelper/scss/app.scss';


class ContentComponent extends React.Component {
  render() {
    const { sentences, highlight, isInitialized, fileName } = this.props;
    const render_str = sentences.map((sent,key) => {
      const sent_light_idx = highlight.get(key);
      var hightlight_words = [];
      sent_light_idx.map(h_light => {
        console.log(h_light);
        hightlight_words.push(sent.substring(h_light.get(0),h_light.get(1)))
      })
      console.log(hightlight_words);
      const split = sent.split('__NL__MARKER__');
      var children = [];
      split.map((piece,key) => {
      var idx = 0;
        hightlight_words.map(word => {
          if (piece.includes(word)) {
            children.push(<span key={uuidV4()}>{piece.substring(idx,piece.indexOf(word))}</span>);
            children.push(<span style={{ backgroundColor: 'yellow'}} key={uuidV4()}>{word}</span>);
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
    fileName: state.contract_helper.get('uploaded_contract')
  }
};

export default connect(mapStateToProps)(ContentComponent);
