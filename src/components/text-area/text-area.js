import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';

const Container = styled('div')({
  padding: 40,
  width: 500,
  height: 500,
  margin: 40,
  border: '1px solid #000',
  position: 'relative'
});

const CursorE = styled('span')({
  position: 'absolute',
});

function Char (props) {
  if (props.code === 13) {
    return <br />;
  }

  let char = String.fromCharCode(props.code);
  console.log('Char', char);
  return <span>{char}</span>
}

function Cursor (props) {
  return <span className="cursor" />
}

function TextArea() {
  let [enableType, toggleEnableType] = React.useState(false);
  let [text, setText] = React.useState([]);
  let handleFocus = () => {
    console.log('focus', enableType);
    toggleEnableType(!enableType)
  };

  React.useEffect(() => {
    let listener = (event) => {
      if (enableType) {
        let code = event.keyCode;
        if (code === 8) {
          let newText = [...removeChars(text, 1)];
          return setText(newText);
        }
        setText([...text, <Char code={code} />])
      };
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener)
  }, [enableType, text]);

  return (
    <Container tabIndex="0" onFocus={handleFocus}>
      {text}
    </Container>
  );
}

function removeChars(text, charToRemove) {
  if (text.length === 0) return [];
  return text.slice(0, text.length - charToRemove);
}

TextArea.defaultProps = {};

TextArea.propTypes = {
};

export default TextArea;
