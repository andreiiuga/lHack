import React from 'react';
import { browserHistory, Link } from 'react-router'
import MaterialTitlePanel from './MaterialTitlePanel';

const styles = {
  sidebar: {
    width: 200,
    height: '85%',
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
    margin: '26px 10px 8px 0px',
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

  return (
    <MaterialTitlePanel title={(<i className="far fa-file-alt"></i>)} style={style}>
      <div style={styles.content}>
        <Link to="/contract_helper" style={styles.sidebarLink} activeStyle={styles.sidebarLinkActive}>
          Contract Helper
        </Link>
        <Link to="/page2" style={styles.sidebarLink} activeStyle={styles.sidebarLinkActive}>
          Settings
        </Link>
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
