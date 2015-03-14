import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';

export default {
  importFiles(files) {
    AppDispatcher.dispatch({
      type: ActionTypes.IMPORT_FILES,
      files
    });
    console.log('files have been imported');
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
