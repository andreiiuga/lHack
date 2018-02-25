import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from './MaterialTitlePanel';
import SidebarContent from './SidebarContent';

import '../scss/main.scss';

import { getFromServer } from 'base/redux/modules/user';

const styles = {
  sidebar: {
    color: 'white',
    width: 200,
    backgroundColor: 'white',
  },
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: 8,
  }
};

class SideBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: false
    };
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.renderHeaderContent = this.renderHeaderContent.bind(this);
  }

  componentWillMount() {
    const mql = window.matchMedia('(min-width: 800px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql,
      sidebarDocked: mql.matches
    });
  }

  componentDidMount() {
    //this.props.getFromServer();
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  mediaQueryChanged() {
    this.setState({sidebarDocked: this.state.mql.matches});
  }

  toggleOpen(e) {
    this.setState({sidebarOpen: !this.state.sidebarOpen});
    if (e) {
      e.preventDefault();
    }
  }

  renderHeaderContent() {

    return (
      <div className="header clearfix">
        {!this.state.sidebarDocked && (
          <a 
            href="#"
            onClick={this.toggleOpen}
            style={styles.contentHeaderMenuLink}>
            <i className="fa fa-bars" />
          </a>
        )}
        <span>LawMap</span>
      </div>
    );
  }

  render() {
    const sidebar = <SidebarContent setSidebarOpen={this.onSetSidebarOpen} />;

    return (
      <Sidebar 
        sidebar={sidebar}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        styles={styles}
        shadow={false}
        sidebarClassName="sidebar"
        onSetOpen={this.onSetSidebarOpen}>
        <MaterialTitlePanel title={this.renderHeaderContent()}>
          { this.props.children }
        </MaterialTitlePanel>
      </Sidebar>
    );
  }
}

SideBarComponent.propTypes = {
  children: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getFromServer
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarComponent);
