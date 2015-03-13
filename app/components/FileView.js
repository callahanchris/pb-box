import React from 'react';
import Dropzone from './Dropzone';
import FileList from './FileList';
import FileStore from '../stores/FileStore';
import FileActionCreators from '../actions/FileActionCreators';
import Immutable from 'immutable';

const FileView = React.createClass({
  getInitialState() {
    return {
      data: Immutable.Map({
        files: FileStore.getAll()
      })
    };
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
      <div className='file-view'>
        <Dropzone importFiles={this.importFiles} />
        <FileList files={this.state.data.get('files')} />
      </div>
    );
  },

  _onChange() {
    this.setState({
      data: this.state.data.update('files', () => (FileStore.getAll()))
    });
  }
});

module.exports = FileView;
