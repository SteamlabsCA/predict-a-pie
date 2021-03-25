import './ClassroomCode.scss';
import React from 'react';
import { strings } from './App';

function ClassroomCode({code, appData, ...props}) {

  return (
    <>
      {code && (
        <div className="ClassroomCode" onClick={props.onDismiss}>
          <div className="ClassroomCode-modal">
            <p>{strings.classroomCode}</p>
            <p className="ClassroomCode-code">{code}</p>
            {(appData.classroom.participants === undefined || appData.classroom.participants.length === 1) && (
              <small>{strings.onlyParticipant}</small>
            )}
            {(appData.classroom.participants !== undefined && appData.classroom.participants.length > 1) && (
              <small>{strings.formatString(strings.participants, appData.classroom.participants.length)}</small>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ClassroomCode;
