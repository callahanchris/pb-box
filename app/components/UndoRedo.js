import React from 'react';
import FileActionCreators from '../actions/FileActionCreators';

const UndoRedo = React.createClass({
  undo(e) {
    e.preventDefault();
    FileActionCreators.undo();
  },

  redo(e) {
    e.preventDefault();
    FileActionCreators.redo();
  },

  render() {
    return (
      <div className='undo-redo'>
        <button onClick={this.undo}>Undo</button>
        <button onClick={this.redo}>Redo</button>
      </div>
    );
  }
});

export default UndoRedo;
