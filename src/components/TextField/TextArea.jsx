/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, TextareaAutosize, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const TextArea = ({ input, onChange, ...props }) => {
  const [lengthError, setLengthError] = useState();

  const handleCahnge = (e) => {
    if (e.target.value.length > 500) {
      setLengthError(true);
      return;
    }
    setLengthError(false);
    if (onChange) onChange(e.target.value);
  };

  return (
    <Box>
      <TextareaAutosize
        placeholder="500자 이내로 작성해주세요."
        value={input}
        minRows={10}
        maxRows={16}
        onChange={handleCahnge}
        {...props}
        css={defaultStyle(lengthError)}
      />
      {lengthError && (
        <Typography sx={{ color: 'red', fontSize: '0.75rem' }}>
          길이 제한을 초과했습니다.(500자 이내)
        </Typography>
      )}
    </Box>
  );
};

const defaultStyle = (lengthError) => css`
  font-size: 0.875rem;
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: 500;
  padding: 0.9375rem 0.75rem;
  resize: none;
  outline: ${lengthError && '1px solid red'};
  &:focus-visible {
    outline: ${lengthError
      ? '2px solid red !important;'
      : '2px solid black !important;'};
  }
`;

export default TextArea;
