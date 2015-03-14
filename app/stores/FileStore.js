import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';
import { EventEmitter } from 'events';
import { List } from 'immutable';

const CHANGE_EVENT = 'change';
// {
//   lastModified: 1423083515000
//   lastModifiedDate: Wed Feb 04 2015 13:58:35 GMT-0700 (MST)
//   name: "fig1.tiff"
//   size: 72290394
//   type: "image/tiff"
//   webkitRelativePath: ""
// }

let _history = List();
let _trash = List();

let _files = List.of(
  {
    id: 1,
    name: 'postcard.png',
    type: 'image/png',
    lastModified: 1423083515000,
    size: 72290394
  },
  {
    id: 2,
    name: 'great-picture.png',
    type: 'image',
    date: '03/05/2015'
  },
  {
    id: 3,
    name: 'vacation.bmp',
    type: 'image',
    date: '03/08/2015'
  },
  {
    id: 4,
    name: 'provo.jpeg',
    type: 'image',
    date: '03/11/2015'
  }
);

_history = _history.push(_files);

let id = 0;

class FileStore extends EventEmitter {
  constructor() {
    this.dispatchToken = AppDispatcher.register((action) => {
      switch(action.type) {
        case ActionTypes.IMPORT_FILES:
          _files = _history.last().concat(action.files);
          _history = _history.push(_files);
          this.emitChange();
          break;

        case ActionTypes.DELETE_FILE:
          let index = _history.last().indexOf(action.file);
          if (index >= 0) {
            _files = _history.last().delete(index);
            _history = _history.push(_files);
            this.emitChange();
          }
          break;

        case ActionTypes.UNDO:
          if (_history.size > 1) {
            _trash = _trash.push(_history.last());
            _history = _history.pop();
            this.emitChange();
          }
          break;

        case ActionTypes.REDO:
          if (_trash.size > 0) {
            _history = _history.push(_trash.last());
            _trash = _trash.pop();
            this.emitChange();
          }
          break;

        default:
          // noop
      }
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  get(id) {
    return _files.get(id);
  }

  getAll() {
    return _history.last().toArray();
  }
}

export default new FileStore();
