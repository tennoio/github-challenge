import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Search from '../Search';
import NoContent from '../NoContent';

import Header from '../../components/Header';

// todo: component-specific strings resource that extends the generic strings one
import { getConfig, getRoutePathWithParams, getString } from '../../utils';

import './index.css';

const FontAwesome = require('react-fontawesome');

const App = () => {
  return (
    <div className="app">

      <Header
        className="app__site-header"
        level={1}
        icon={
          <FontAwesome name="newspaper-o" />
        }
      >
        <Link to="/" href="/">{getString('siteTitle')}</Link>
      </Header>

      <Container fluid>
        <Row>
          <Col xs="12">
            <Switch>

              {/* Redirect / to the search page */}
              <Route
                exact
                path="/"
                render={() => (
                  <Redirect to={getConfig('routePaths.search')} />
                )}
              />

              {/* Send search with no route params to the search component */}
              <Route
                exact
                path={getConfig('routePaths.search')}
                component={Search}
              />

              {/* Redirect search with only one param to the complete search path */}
              <Route
                exact
                path={getConfig('routePaths.searchParamsShort')}
                render={props => (
                  <Redirect to={
                    getRoutePathWithParams('searchParamsFull', {
                      searchQuery: props.match.params.searchQuery,
                      pageNumber: 1,
                    })}
                  />
                )}
              />

              {/* Send search with both params to the search component */}
              <Route
                path={getConfig('routePaths.searchParamsFull')}
                component={Search}
              />

              {/* Catch-all for everything else */}
              <Route
                path="*"
                status={404}
                component={NoContent}
              />

            </Switch>
          </Col>
        </Row>
      </Container>

    </div>
  );
};

App.defaultProps = {
  match: {},
};

App.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]),
};

export default App;
