import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ReplyComment from './replyComment';
import SubComment from './subComment';
import EditComment from './editComment';
import '../styles/comment.css';

function Comment({ id, currentCommentContent, username, profilePicUrl, currentSubComments, commentDateTime, likes, liked, deleteComment }) {
    const [noOfLikes, setNoOfLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(liked);
    const [commentContent, setCommentContent] = useState(currentCommentContent);
    const [subComments, setSubComments] = useState(currentSubComments);
    const [canReply, setCanReply] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dateTimeConstant = `${formatDistanceToNow(commentDateTime)} ago`;

    const deleteSubComment = (subCommentId) => {
        setSubComments(subComments => subComments.filter(subComment => subComment.id !== subCommentId));
    };

    return (
        <React.Fragment>
            <div style={{ marginLeft: '3%' }}>
                {!isEditing?
                <div className='comment-div'>
                    <img src={profilePicUrl} alt='Pic' />
                    <div className='comment-content-div'>
                        <div>
                            <span style={{ color: '#2AC0D1', fontWeight: 500 }}>{username}</span>
                            <span className='dot' style={{ color: 'grey' }}>.</span>
                            <span style={{ color: 'grey', fontSize: 12 }}>{dateTimeConstant}</span>
                        </div>
                        <span>{commentContent}</span>
                        <span className='comment-content-third-row'>
                            {noOfLikes}
                            <span
                                className='material-symbols-outlined comment-action'
                                style={{ color: isLiked ? 'blue' : 'grey' }}
                                onClick={() => {
                                    if (!isLiked) {
                                        setNoOfLikes(curr => curr + 1);
                                        setIsLiked(curr => !curr);
                                    }
                                }}
                            >
                                expand_less
                            </span>
                            <span>|</span>
                            <span
                                className='material-symbols-outlined comment-action'
                                onClick={() => {
                                    if (isLiked) {
                                        setNoOfLikes(curr => curr - 1);
                                        setIsLiked(curr => !curr);
                                    }
                                }}
                            >
                                expand_more
                            </span>
                            <span className='dot'>.</span>
                            <span
                                className='comment-action'
                                style={{ color: canReply ? 'blue' : 'grey' }}
                                onClick={() => {
                                    setCanReply(curr => !curr);
                                }}
                            >Reply</span>
                            <span className='dot'>.</span>
                            <span
                                className='comment-action'
                                style={{ color: isEditing ? 'blue' : 'grey' }}
                                onClick={() => {
                                    setIsEditing(curr => !curr);
                                }}
                            >Edit</span>
                            <span className='dot'>.</span>
                            <span className='comment-action' onClick={() => deleteComment(id)}>Delete</span>
                            <span className='dot'>.</span>
                        </span>
                    </div>
                </div>
                :
                <EditComment
                    isVisible={isEditing}
                    profilePicUrl={profilePicUrl}
                    currentCommentContent={commentContent}
                    setCurrentCommentContent={(x) => setCommentContent(x)}
                    setIsEditing={setIsEditing}
                />}
                {
                    subComments.length > 0 ?
                        subComments.map(comment =>
                        (

                            <SubComment
                                key={comment.id}
                                id={comment.id}
                                commentContent={comment.commentContent}
                                username={comment.username}
                                profilePicUrl={comment.profilePicUrl}
                                currentSubComments={comment.subComments || []}
                                commentDateTime={comment.commentDateTime}
                                likes={comment.likes}
                                liked={comment.liked}
                                deleteSubComment={ subCommentId => deleteSubComment(subCommentId) }
                            />
                        )
                        )
                        :
                        null
                }
            </div>
            {
                canReply ?
                    <ReplyComment isVisible={true} username={username} setSubComments={setSubComments} setCanReply={setCanReply} />
                    :
                    null
            }
        </React.Fragment>
    );
}

export default Comment;