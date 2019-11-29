import React from 'react';
import { Popover, Typography } from 'antd';
import { Link } from 'react-router-dom';

const HeartPopover = ({ icon, visible }) => {
  const style = {
    width: '220px',
  };

  const content = (
    <Typography style={style}>
      <b><p>Поиск сохранён в разделе "Избранное"</p></b>
      <Link to="/favorites">
        <p className="HeartPopover-Link">Перейти в избранное</p>
      </Link>
    </Typography>
  );

  return (
    <Popover placement="bottom" content={content} visible={visible}>
      {icon}
    </Popover>
  );
};

export default HeartPopover;
