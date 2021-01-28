import React from 'react';

function ContentEditable(props) {

  const [content, setContent] = React.useState(props.content);
  const element = React.createRef();

  const onBlur = (event) => {
    const selection = window.getSelection();
    selection.removeAllRanges();
    setContent(event.target.textContent);
    props.onChange(event.target.textContent);
  }

  const onFocus = (event) => {
    const range = document.createRange();
    range.selectNodeContents(element.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
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
      ref={element}
      className={props.className}
      contentEditable
      suppressContentEditableWarning
      autoCorrect="false"
      autoCapitalize="false"
      spellCheck="false"
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}>
      {content}
    </div>
  )
}

export default ContentEditable;
