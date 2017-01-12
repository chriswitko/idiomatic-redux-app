import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from '../css/style.css';
import CSSModules from 'react-css-modules'

class Nav extends Component {

  render() {
    return (
      <p>
        <span className={styles.Secondary}>Hello</span>
        {" "}
        <Link
          to={'/'}
          activeClassName={styles.primary}
        >
        Home
        </Link>
        {", "}
        <Link
          to='/todo/'
          activeClassName={styles.primary}
        >
        Todos
        </Link>
      </p>
    )
  }
}

// export default CSSModules(Nav, styles, {allowMultiple: true, errorWhenNotFound: true} )
export default Nav;
