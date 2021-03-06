import React, { PropTypes, Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import cx from 'classnames';

import s from './styles.mscss';

export class AddComment extends Component {
  static propTypes = {
    parentId: PropTypes.number,
    isReply: PropTypes.bool,
    showSocialPopup: PropTypes.func,
    handleSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    const { isReply } = this.props;
    isReply && this.refs.root.querySelector('textarea').focus();
  }

  handleSubmit = () => {
    const { parentId, handleSubmit } = this.props;
    const { text } = this.state;

    this.setState({ text: '' });

    handleSubmit({
      parentId,
      text,
    });
  }

  handleChange = (event) => {
    const text = event.currentTarget.value;

    this.setState({
      text,
    });
  }

  render() {
    const { isReply } = this.props;
    const { text } = this.state;
    const buttonDisabled = isReply && !text;

    return (
      <div className={s.root} ref="root">
        {
          !isReply &&
            <span className={s.title}>
              Add comment
            </span>
        }

        <TextareaAutosize
          placeholder="Your message"
          onChange={this.handleChange}
          className={cx(s.text, { [s.small]: isReply })}
          rows={isReply ? 1 : 3}
          maxRows={5}
          value={text}
        />

        <div className={s.buttonContainer}>
          <button
            className={s.button}
            onClick={this.handleSubmit}
            disabled={buttonDisabled}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default AddComment;
