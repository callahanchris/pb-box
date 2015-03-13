import React from 'react';
import FileCard from './FileCard';

const FileList = React.createClass({
  render() {
    return (
      <div className='file-list'>
        <h3>FileList</h3>
        <ul>
          {this.props.files.map((file) => (
            <FileCard file={file} key={file.id} />
          ))}
        </ul>
      </div>
    );
  }
});

module.exports = FileList;
