import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import AddComment from 'components/Modules/AddComment';
import Comment from 'components/Helpers/Comment';

import s from './styles.mscss';

export class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      showReplyFormForCommentId: null,
    };
  }

  handleReply = (commentId) => {
    // Click in reply

    this.setState({
      showReplyFormForCommentId: commentId,
    });
  }

  renderComments = (parentComment) => {
    const { comments } = this.props;
    const { showReplyFormForCommentId } = this.state;
    // It is inner comments or not?

    const renderCommentsList = comments.filter(comment => parentComment
      ? comment.parentId && comment.parentId === parentComment.id
      : !comment.parentId);

    if (!renderCommentsList.length) return false;

    return (
      <div className={cx(
        { [s.comments]: !parentComment },
        { [s.innerComments]: parentComment },
      )}>
        {
          renderCommentsList.map(comment => (
            <div key={comment.id}>
              <Comment
                {...comment}
                handleReply={this.handleReply}
                showReplyForm={showReplyFormForCommentId === comment.id}
                AddCommentForm={this.renderAddComment}
                replyName={parentComment && `${parentComment.author.firstName} ${parentComment.author.lastName}`}
              />
              {this.renderComments(comment)}
            </div>
          ))
        }
      </div>
    );
  }

  renderAddComment = ({ parentId, isReply } = {}) => (
    <AddComment
      {...this.props}
      parentId={parentId}
      isReply={isReply}
      handleSubmit={() => console.log('your magic')}
    />
  )

  render() {
    return (
      <div className={s.root}>
        <div className={s.addComment}>
          { this.renderAddComment() }
        </div>

        { this.renderComments() }
      </div>
    );
  }
}

export default Comments;
