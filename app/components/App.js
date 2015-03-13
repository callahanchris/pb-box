import React from 'react';
import FileView from './FileView';

const App = React.createClass({
  render() {
    return (
      <div className='main'>
        <h1 className='logo'>Pb Box</h1>
        <FileView />
      </div>
    );
  }
});

module.exports = App;
