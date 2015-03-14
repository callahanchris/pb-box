import React from 'react';
import FileSection from './FileSection';
import PreviewSection from './PreviewSection';

const App = React.createClass({
  render() {
    return (
      <div className='main'>
        <h1 className='logo'>Pb Box</h1>
        <FileSection />
        <PreviewSection />
      </div>
    );
  }
});

module.exports = App;
