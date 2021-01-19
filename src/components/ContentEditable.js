import React from 'react';

function ContentEditable(props) {

  const [content, setContent] = React.useState(props.content);

  const onBlur = (event) => {
    setContent(event.target.textContent);
    props.onChange(event.target.textContent);
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
    if (event.key === 'Escape') {
      event.target.textContent = content;
      event.target.blur();
    }
  }

  return (
    <div
      className={props.className}
      contentEditable
      suppressContentEditableWarning
      onBlur={onBlur}
      onKeyDown={onKeyDown}>
      {content}
    </div>
  )
}

export default ContentEditable;
