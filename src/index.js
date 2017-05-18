import React from 'react';
import ReactDOM from 'react-dom';
import Comments from './components/Modules/Comments';
import comments from './comments';

import s from './styles.mscss';

if (__CLIENT__) {
  ReactDOM.render(
    <div className={s.app}>
      <Comments comments={comments} />
    </div>,
    document.getElementById('root')
  );
}
