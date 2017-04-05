import React, { Component, PropTypes } from 'react';

import ProgressButton from 'stemn-shared/misc/Buttons/ProgressButton/ProgressButton';
import TaskLabelsEdit from 'stemn-shared/misc/Tasks/TaskLabelsEdit/TaskLabelsEdit.jsx'

export default class TasksSettings extends Component {
  static propTypes = {
    board: PropTypes.object.isRequired,
    boardModel: PropTypes.string.isRequired,
    saveBoard: PropTypes.func.isRequired,
  }
  render() {
    const { boardModel, board, saveBoard } = this.props;
    return(
      <div>
        <h3>Task Labels</h3>
        <p>Labels are used to categorize tasks. If you delete a label, it will be removed from all assigned tasks.</p>
        <TaskLabelsEdit model={`${boardModel}.forms.labels`} value={board.forms.labels} />
        <br />
        <div className="layout-row">
          <div className="flex"></div>
          <ProgressButton
            className="primary"
            onClick={saveBoard}
            loading={board.savePending}>
            Save Labels
          </ProgressButton>
        </div>
      </div>
    );
  }
}