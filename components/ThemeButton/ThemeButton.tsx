'use client';

import { useContext } from 'react';
import { ThemeContext } from '../../context';

function ThemeButton() {
  const { theme, dispatch } = useContext(ThemeContext);
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  function hanldeTheme() {
    if (dispatch) dispatch(nextTheme);
  }

  return (
    <button type="button" onClick={() => hanldeTheme()}>
      Change to {nextTheme}
    </button>
  );
}
export default ThemeButton;
