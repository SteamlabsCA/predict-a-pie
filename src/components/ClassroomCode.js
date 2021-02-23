import './ClassroomCode.scss';
import React from 'react';

function ClassroomCode({code, appData, ...props}) {

  return (
    <>
      {code && (
        <div className="ClassroomCode" onClick={props.onDismiss}>
          <div className="ClassroomCode-modal">
            <p>The classroom code is:</p>
            <p className="ClassroomCode-code">{code}</p>
            {(appData.classroom.participants === undefined || appData.classroom.participants.length === 1) && (
              <small>You are the only participant.</small>
            )}
            {(appData.classroom.participants !== undefined && appData.classroom.participants.length > 1) && (
              <small>There are currently {appData.classroom.participants.length} participants.</small>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ClassroomCode;
