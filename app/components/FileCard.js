import React from 'react';
import FileActionCreators from '../actions/FileActionCreators';

const FileCard = React.createClass({
  propTypes: {
    file: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      isOpen: false
    };
  },

  handleToggle() {
    console.log('toggle', this.state)
    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  handleDelete(file) {
    FileActionCreators.deleteFile(file);
  },

  render() {
    let kb = Math.floor(this.props.file.size / 1000);
    let hundredKb = Math.floor(kb / 100);
    let size = null;
    if (this.props.file.size) {
      if (hundredKb >= 10) {
        let arr = hundredKb.toString().split('')
        let last = arr.pop();
        arr.push('.');
        arr.push(last);
        size = arr.join('') + ' MB';
      } else {
        size = kb + ' KB';
      }
    }

    let date = new Date(this.props.file.lastModified).toLocaleDateString();
    
    if (date.match(/Invalid/)) {
      date = null;
    }

    return (
      <div className='file-card-container'>
        <li className='file-card'>
          <span className='file-card-name pure-u-1-6' onClick={this.handleToggle}>
            {this.props.file.name}
          </span>
          <span className='file-card-type pure-u-1-6' onClick={this.handleToggle}>
            {this.props.file.type}
          </span>
          <span className='file-card-date pure-u-1-6' onClick={this.handleToggle}>
            {date}
          </span>
          <span className='file-card-size pure-u-1-6' onClick={this.handleToggle}>
            {size}
          </span>
          <span className='file-card-button'>
            <button type='button' onClick={this.handleDelete.bind(this, this.props.file)}>delete</button>
          </span>
        </li>
        {this.state.isOpen && this.props.children}
      </div>
    )
  }
});

export default FileCard;