import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';

export default {
  importFiles(files) {
    debugger;
    AppDispatcher.dispatch({
      type: ActionTypes.IMPORT_FILES,
      files
    });
    console.log('files have been imported');
  },

  deleteFile(file) {
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_FILE,
      file
    });
  },

  undo() {
    AppDispatcher.dispatch({
      type: ActionTypes.UNDO
    });
  },

  redo() {
    AppDispatcher.dispatch({
      type: ActionTypes.REDO
    });
  }
};
