import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import AddComment from 'components/Modules/AddComment';
import Comment from 'components/Helpers/Comment';

import s from './styles.mscss';

export class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
    postId: PropTypes.string,
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

  render() {
    const { comments, postId } = this.props;
    const { showReplyFormForCommentId } = this.state;

    const AddCommentForm = ({ parentId, isReply }) => (
      <AddComment
        {...this.props}
        postId={postId}
        parentId={parentId}
        isReply={isReply}
      />
    );

    const renderComments = (parentCommentId) => {
      // It is inner comments or not?

      const renderCommentsList = comments.filter(comment => parentCommentId
        ? comment.parentId && comment.parentId === parentCommentId
        : !comment.parentId);

      if (!renderCommentsList.length) return false;

      return (
        <div className={cx(
          { [s.comments]: !parentCommentId },
          { [s.innerComments]: parentCommentId },
        )}>
          {
            renderCommentsList.map(comment => (
              <div key={comment.id}>
                <Comment
                  {...comment}
                  handleReply={this.handleReply}
                  showReplyForm={showReplyFormForCommentId === comment.id}
                  postId={postId}
                  AddCommentForm={AddCommentForm}
                  replyName={parentCommentId && `${comment.author.firstName} ${comment.author.lastName}`}
                />
                {renderComments(comment.id)}
              </div>
            ))
          }
        </div>
      );
    };

    return (
      <div className={s.root}>
        <div className={s.addComment}>
          <AddCommentForm />
        </div>

        { renderComments() }
      </div>
    );
  }
}

export default Comments;
