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
      console.log(highlight.get(key));
      const sent_light_idx = highlight.get(key);
      var hightlight_words = [];
      sent_light_idx.map(h_light => {
        hightlight_words.push(sent.substr(h_light[0],h_light[1]))
      })
      const split = sent.split('__NL__MARKER__');
      var children = [];
      split.map((piece,key) => {
        var is_highlight = false
        hightlight_words.map(word => {
          is_highlight = piece.includes(word)
        })

        children.push(<span style={is_highlight ? { backgroundColor: 'yellow'} : {}} key={key+'sent'}>{piece}</span>);
        children.push(<br key={key+'br'}/>)
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
