'use client';

import { Button } from 'antd';
import { useContext } from 'react';
import { ThemeContext } from '../../context';

function ThemeButton() {
  const { theme, dispatch } = useContext(ThemeContext);
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  function hanldeTheme() {
    if (dispatch) dispatch(nextTheme);
  }

  return (
    <Button type="primary" onClick={() => hanldeTheme()}>
      Change to {nextTheme}
    </Button>
  );
}
export default ThemeButton;
