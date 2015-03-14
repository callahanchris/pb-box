import React from 'react';
import Immutable from 'immutable';

const Dropzone = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string.isRequired,
    multiple: React.PropTypes.bool.isRequired,
    accept: React.PropTypes.string,
    importFiles: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      placeholder: 'Drag and drop file or click to upload.',
      multiple: true
    };
  },

  getInitialState() {
    return Immutable.Map({
      isDragActive: false
    });
  },

  _accept(dataTransfer) {
    let items = dataTransfer.items || dataTransfer.files;

    if (!this.props.multiple && items.length >1) {
      return false;
    }

    if (this.props.accept) {
      let splt = this.props.accept.split('/');
      for (let i = 0; i < items.length; i++) {
        if ((splt[1] === '*' && splt[0] !== items[i].type.split('/')[0]) ||
            (this.props.accept === items.type)) {
          return false;
        }
      }
    }
    return true;
  },

  onClick(e) {
    this.refs.inputFile.getDOMNode().click();
  },

  onChange(e) {
    let files = Immutable.List(Array.prototype.slice.call(e.target.files));
    this.props.importFiles(files);
  },

  onDragStart(e) {
    if (this._accept(e.dataTransfer)) {
      e.dataTransfer.effectAllowed = 'copy';
    }
  },

  onDragEnter(e) {
    this.replaceState(this.state.update('isDragActive', () => true));
    if (this._accept(e.dataTransfer)) {
      e.dataTransfer.dropEffect = 'copy';
      e.preventDefault();
    }
  },

  onDragLeave(e) {
    e.preventDefault();
    this.replaceState(this.state.update('isDragActive', () => false));
  },

  onDragOver(e) {
    this.replaceState(this.state.update('isDragActive', () => true));
    if (this._accept(e.dataTransfer)) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    }
  },

  onDrop(e) {
    this.replaceState(this.state.update('isDragActive', () => false));
    e.stopPropagation();
    if (this._accept(e.dataTransfer)) {
      e.preventDefault();
      let files = Immutable.List(Array.prototype.slice.call(e.dataTransfer.files));
      this.props.importFiles(files);
    }
  },

  render() {
    let styles = {
      borderStyle: this.state.get('isDragActive') ? "solid" : "dashed",
    };

    return (
      <form
        style={styles}
        encType='multipart/form-data'
        className={this.state.get('isDragActive') ? 'dropzone pure-u-lg-1-5 dropzone-hovered': 'dropzone pure-u-lg-1-5'}
        onClick={this.onClick}
        onDragStart={this.onDragStart}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <span>
          {' ' + this.props.placeholder.replace('file', 'file' + (this.props.multiple ? 's' : ''))}
        </span>
        <input
          style={{display: 'none'}}
          type='file'
          name='file[]'
          multiple={this.props.multiple}
          accept={this.props.accept}
          ref='inputFile'
          onChange={this.onChange}
        />
      </form>
    );
  }
});


export default Dropzone;
