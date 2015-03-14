import React from 'react';
import FileCard from './FileCard';

const FileList = React.createClass({
  render() {
    return (
      <div className='file-list pure-u-lg-3-4'>
        <ul>
          {this.props.files.length > 0  &&
            <li className='file-card file-card-top-row' key={'title'}>
              <span className='file-card-name pure-u-1-6'>
                Name
              </span>
              <span className='file-card-type pure-u-1-6'>
                Type
              </span>
              <span className='file-card-date pure-u-1-6'>
                Date
              </span>
              <span className='file-card-size pure-u-1-6'>
                Size
              </span>
              <span className='file-card-button'>
              </span>
            </li>
          }
          {this.props.files.map((file, i) => (
            <FileCard file={file} key={i}>
              <div className='file-image-container'>
                <img src={file.src} width="600px" />
              </div>
            </FileCard>
          ))}
        </ul>
      </div>
    );
  }
});

module.exports = FileList;
