import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getCurrentUserDetails from '../utils/getCurrentUserDetails';
import '../styles/addComment.css';

function AddComment({ addComment })
{
    const [commentContent, setCommentContent] = useState('');
    return (
        <div className='add-comment-div'>
            <img src={getCurrentUserDetails().profilePicUrl} alt='Pic' />
            <textarea cols='75' placeholder='Join the discussion...' value={commentContent} onInput={e => setCommentContent(e.target.value)} />
            <button onClick={() => {
                if(commentContent.length > 0)
                {
                    addComment({ id: uuidv4(), commentContent: commentContent, commentDateTime: new Date()});
                    setCommentContent('');
                }
            }}>Post</button>
        </div>
    );
}

export default AddComment;