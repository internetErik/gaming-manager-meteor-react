import React from 'react';
import { Link } from 'react-router-dom';
import AccountsUIWrapper from '../../containers/AccountsUIWrapper';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    return (
    <header className="header bgc-black c-white posf w100% z2">
      <div className="grid-container df jcsb aic">
        <div className="header__links">
          <Link to="/">Home</Link>
          <Link to="/campaign-list">Campaigns</Link>
          <Link to="/character-list">Characters</Link>
          <Link to="/spells">Spells</Link>
        </div>
        <div>
          {this.props.selectedCampaign &&
          <>Selected Campaign : { this.props.selectedCampaign.name }</>
          }
        </div>
        <AccountsUIWrapper />
      </div>
    </header>
    )
  }
}

const mapStateToProps = ({ appReducer : { selectedCampaign } }) => ({
  selectedCampaign,
})

export default connect(mapStateToProps)(Header)