'use client';

import { Space, Switch } from 'antd';
import { useContext } from 'react';
import { IoMoonSharp, IoSunnySharp } from 'react-icons/io5';
import { ThemeContext } from '../../context';

function ThemeButton() {
  const { theme, dispatch } = useContext(ThemeContext);
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  function changeTheme() {
    if (dispatch) dispatch(nextTheme);
  }

  return (
    <Space>
      <Switch
        checked={theme === 'dark'}
        onChange={() => changeTheme()}
        checkedChildren={<IoMoonSharp />}
        unCheckedChildren={<IoSunnySharp />}
      />
    </Space>
  );
}
export default ThemeButton;
