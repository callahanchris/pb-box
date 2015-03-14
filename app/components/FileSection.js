import React from 'react';
import Dropzone from './Dropzone';
import FileList from './FileList';
import FileStore from '../stores/FileStore';
import FileActionCreators from '../actions/FileActionCreators';
import Immutable from 'immutable';

const FileSection = React.createClass({
  getInitialState() {
    return Immutable.Map({
      files: FileStore.getAll()
    });
  },

  componentDidMount() {
    FileStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    FileStore.removeChangeListener(this._onChange);
  },

  importFiles(files) {
    FileActionCreators.importFiles(files);
  },

  render() {
    return (
      <div className='file-section pure-g'>
        <Dropzone importFiles={this.importFiles} />
        <FileList files={this.state.get('files')} />
      </div>
    );
  },

  _onChange() {
    this.replaceState(this.state.update('files', () => (FileStore.getAll())));
  }
});

export default FileSection;
