import React, { PropTypes } from 'react';
import { getTimeAgoFormatter } from 'utils/date';
import TimeAgo from 'react-timeago';

import s from './styles.mscss';

function Comment({
  id,
  author,
  createdAt,
  text,
  handleReply,
  showReplyForm,
  AddCommentForm,
  replyName,
}) {
  const formatter = getTimeAgoFormatter('en');
  let commentText = text.split('\n').join('<br />');
  if (replyName) {
    commentText = `<i>${replyName}</i>, ` + commentText;
  }

  return (
    <div className={s.root}>
      <div className={s.author}>
        <div className={s.authorUserpic}>
          <img src={author.userpic} />
        </div>

        <div className={s.authorInfo}>
          <span className={s.authorName}>
            {author.firstName} {author.lastName}
          </span>

          <span className={s.ago}>
            <TimeAgo
              {...formatter}
              live={false}
              date={createdAt}
            />
          </span>
        </div>
      </div>
      <div className={s.content}>
        <div
          className={s.text}
          dangerouslySetInnerHTML={{
            __html: commentText,
          }}
        />

        {
          showReplyForm
            ? <AddCommentForm parentId={id} isReply />
            : (
              <span
                onClick={() => handleReply(id)}
                className={s.reply}
              >
                Reply
              </span>
            )
        }
      </div>
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.number,
  author: PropTypes.object,
  createdAt: PropTypes.any,
  text: PropTypes.string,
  handleReply: PropTypes.func,
  showReplyForm: PropTypes.bool,
  AddCommentForm: PropTypes.any,
  replyName: PropTypes.string,
};

export default Comment;
