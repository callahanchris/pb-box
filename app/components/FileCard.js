import React from 'react';

const FileCard = React.createClass({
  propTypes: {
    file: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <li className='file-card'>
        {this.props.file.id}. {this.props.file.name}
      </li>
    )
  }
});

export default FileCard;