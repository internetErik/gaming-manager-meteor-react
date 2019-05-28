import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import {
  HomePage,
  SpellListPage,
  CampaignListPage,
  CampaignFormPage,
  CharacterListPage,
  CharacterFormPage,
  TestFormPage,
} from './pages';

const SiteRoutes = ({ currentUser }) => (
<Switch>
  <Route
    path='/'
    exact
    render={props =>
      <HomePage
        { ...props }
        currentUser={currentUser}
      />
    }
  />
  <Route
    path='/spells'
    render={props =>
      <SpellListPage
        { ...props }
        currentUser={currentUser}
      />
    }
  />
  <Route
    path='/campaign-list'
    render={props =>
      <CampaignListPage
        { ...props }
        currentUser={currentUser}
      />
    }
  />
  <Route
    path='/campaign-form'
    render={props =>
      <CampaignFormPage
        { ...props }
        currentUser={currentUser}
      />
    }
  />
  <Route
    path='/character-list'
    render={props =>
      <CharacterListPage
        { ...props }
        currentUser={currentUser}
      />
    }
  />
  <Route
    path='/character-form'
    render={props =>
      <CharacterFormPage
        { ...props }
        currentUser={currentUser}
      />
    }
  />
  <Route
    path='/test'
    render={props =>
      <TestFormPage
        { ...props }
        currentUser={currentUser}
      />
    }
  />
  <Route
    path='/*'
    render={() => <div>Not Found</div>}
  />
</Switch>
)

export default SiteRoutes;
