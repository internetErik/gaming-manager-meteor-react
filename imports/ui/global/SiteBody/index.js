import React from 'react';
import PropTypes from 'prop-types';

export default class SiteBody extends React.Component {

  static propTypes = {
    className : PropTypes.string,
    children  : PropTypes.object.isRequired,
  };

  render() {
    const { className, children } = this.props;
    return (
    <section className={`site-body z1 ${ className || '' }`}>
      <div className="posr">
        {children}
      </div>
    </section>
    );
  }

}
