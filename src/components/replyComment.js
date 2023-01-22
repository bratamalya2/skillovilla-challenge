import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getCurrentUserDetails from '../utils/getCurrentUserDetails';
import '../styles/replyComment.css';

function ReplyComment({ isVisible, username, setSubComments, setCanReply }) {
    const [commentContent, setCommentContent] = useState('');

    if (isVisible)
        return (
            <div className='reply-comment-div'>
                <img src={getCurrentUserDetails().profilePicUrl} alt='Pic' />
                <textarea cols='75' placeholder='Join the discussion...' onInput={e => setCommentContent(e.target.value)} />
                <div>
                    <div onClick={() => setCanReply(curr => !curr)}>Cancel</div>
                    <button onClick={() => {
                        if (commentContent.length > 0) {
                            setSubComments(curr => [
                                ...curr,
                                {
                                    id: uuidv4(),
                                    profilePicUrl: getCurrentUserDetails().profilePicUrl,
                                    username: username,
                                    commentContent: commentContent,
                                    likes: 0,
                                    commentDateTime: new Date(),
                                    liked: false,
                                    currentSubComments: []
                                }
                            ]);
                            setCanReply(curr => !curr);
                        }
                    }}>Post</button>
                </div>
            </div>
        );
    else
        return null;
}

export default ReplyComment;