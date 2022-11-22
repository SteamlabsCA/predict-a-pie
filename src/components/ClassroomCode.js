import "./ClassroomCode.scss";
import React, { useState } from "react";
import { strings } from "./App";
import { useHistory } from "react-router-dom";

function ClassroomCode({ code, appData, ...props }) {
  const [copiedText, setCopiedText] = useState();
  const history = useHistory();

  const click = () => {
    props.onDismiss();
    history.push(`${code}/trained`);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopiedText("Classroom code copied!");
    setTimeout(() => {
      setCopiedText();
    }, 2000);
  };

  return (
    <>
      {code && (
        <div className="ClassroomCode" onClick={click}>
          <div
            className="ClassroomCode-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <p>{strings.classroomCode}</p>
            <p className="ClassroomCode-code" onClick={copyCode}>
              {code}
            </p>
            <p>
              Copy and send this generated URL to your participants for them to
              join your classroom
            </p>
            <p className="ClassroomCode-copied">{copiedText}</p>

            {/* {(appData.classroom.participants === undefined || appData.classroom.participants.length === 1) && (
              <small>{strings.onlyParticipant}</small>
            )}
            {(appData.classroom.participants !== undefined && appData.classroom.participants.length > 1) && (
              <small>{strings.formatString(strings.participants, appData.classroom.participants.length)}</small>
            )} */}
          </div>
        </div>
      )}
    </>
  );
}

export default ClassroomCode;
