import React from 'react';
import { browserHistory, Link } from 'react-router'
import MaterialTitlePanel from './MaterialTitlePanel';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '10px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  sidebarLinkActive: {
    color: '#1c1c1c'
  },
  divider: {
    margin: '26px 50px 8px 0px',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '20px',
    height: '100%',
    backgroundColor: 'white',
    color: '#cecece',
  },
};

const SidebarContent = (props) => {
  const style = props.style ? {...styles.sidebar, ...props.style} : styles.sidebar;

  const logo = (<img src="" height="25px" alt="Logo"/>);

  return (
    <MaterialTitlePanel title={logo} style={style}>
      <div style={styles.content}>
        <Link to="/page1" style={styles.sidebarLink} activeStyle={styles.sidebarLinkActive}>Page 1</Link>
        <Link to="/page2" style={styles.sidebarLink} activeStyle={styles.sidebarLinkActive}>Page 2</Link>
        <div style={styles.divider} />
      </div>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: React.PropTypes.object,
  setSidebarOpen: React.PropTypes.func,
};

export default SidebarContent;
