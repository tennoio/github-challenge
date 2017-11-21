import React from 'react';
import autoBind from 'react-autobind';

import { getString } from '../utils';

class NoContent extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>{getString('noContent.title')}</h2>
        <div>{getString('noContent.bodyText')}</div>
      </div>
    );
  }
}

export default NoContent;
