import { Meteor } from 'meteor/meteor'
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Header   from './global/Header';
import SiteBody from './global/SiteBody';
import Footer   from './global/Footer';
import SiteRoutes from './SiteRoutes';

const App = ({ currentUser }) => (
<>
  <Header />
  <SiteBody>
    <SiteRoutes currentUser={currentUser} />
  </SiteBody>
  <Footer />
</>
)

export default withTracker(() => ({
  currentUser : Meteor.user(),
}))(App);