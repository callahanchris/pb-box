import React from 'react';
import FileActionCreators from '../actions/FileActionCreators';
// {
//   lastModified: 1423083515000
//   lastModifiedDate: Wed Feb 04 2015 13:58:35 GMT-0700 (MST)
//   name: "fig1.tiff"
//   size: 72290394
//   type: "image/tiff"
//   webkitRelativePath: ""
// }
const FileCard = React.createClass({
  propTypes: {
    file: React.PropTypes.object.isRequired
  },

  handleClick(file) {
    FileActionCreators.deleteFile(file);
  },

  render() {
    let kb = Math.floor(this.props.file.size / 1000);
    let mb = Math.floor(kb / 1000);
    let size = null;
    if (this.props.file.size) {
      size = mb >= 1 ? mb + ' MB' : kb + ' KB';
    }

    let date = new Date(this.props.file.lastModified).toLocaleDateString();
    
    if (date.match(/Invalid/)) {
      date = null;
    }

    return (
      <li className='file-card'>
        {this.props.file.name} - {this.props.file.type} - {date} - {size}
        <button type='button' onClick={this.handleClick.bind(this, this.props.file)}>delete</button>
      </li>
    )
  }
});

export default FileCard;