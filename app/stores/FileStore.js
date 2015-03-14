import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';
import { EventEmitter } from 'events';
import { List } from 'immutable';

const CHANGE_EVENT = 'change';

let _history = List();
let _trash = List();

let _files = List.of(
  {
    lastModified: 1426293780000,
    lastModifiedDate: "Fri Mar 13 2015 18:43:00 GMT-0600 (MDT)",
    name: "candy-apples.jpg",
    size: 1357774,
    type: "image/jpeg",
    webkitRelativePath: "",
    src: "/public/img/candy-apples.jpg"
  },
  {
    lastModified: 1426293791000,
    lastModifiedDate: "Fri Mar 13 2015 18:43:11 GMT-0600 (MDT)",
    name: "park-city.jpg",
    size: 1104964,
    type: "image/jpeg",
    webkitRelativePath: "",
    src: "/public/img/park-city.jpg"
  },
  {
    lastModified: 1426293766000,
    lastModifiedDate: "Fri Mar 13 2015 18:42:46 GMT-0600 (MDT)",
    name: "provo.jpg",
    size: 1029338,
    type: "image/jpeg",
    webkitRelativePath: "",
    src: "/public/img/provo.jpg"
  },
  {
    lastModified: 1426293807000,
    lastModifiedDate: "Fri Mar 13 2015 18:43:27 GMT-0600 (MDT)",
    name: "react-week.jpg",
    size: 1646044,
    type: "image/jpeg",
    webkitRelativePath: "",
    src: "/public/img/react-week.jpg"
  }
);

_history = _history.push(_files);

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
