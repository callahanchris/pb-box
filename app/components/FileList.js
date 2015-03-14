import React from 'react';
import FileCard from './FileCard';

const FileList = React.createClass({
  render() {
    return (
      <div className='file-list pure-u-lg-3-4'>
        <h3>FileList</h3>
        <ul>
          {this.props.files.map((file, i) => (
            <FileCard file={file} key={i} />
          ))}
        </ul>
      </div>
    );
  }
});

module.exports = FileList;
