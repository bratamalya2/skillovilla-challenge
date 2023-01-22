import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Comment from './comment';
import ReplyComment from './replyComment';
import EditComment from './editComment';
import '../styles/comment.css';

function SubComment({ id, commentContent, username, profilePicUrl, currentSubComments, commentDateTime, likes, liked, deleteSubComment }) {
    const [noOfLikes, setNoOfLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(liked);
    const [currentCommentContent, setCurrentCommentContent] = useState(commentContent);
    const [subComments, setSubComments] = useState(currentSubComments);
    const [canReply, setCanReply] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dateTimeConstant = `${formatDistanceToNow(commentDateTime)} ago`;

    const deleteComment = (commentId) => {
        setSubComments(comments => comments.filter(comment => comment.id !== commentId));
    };

    return (
        <React.Fragment>
            <div style={{ marginLeft: '3%' }}>
                {!isEditing ?
                    <div className='comment-div'>
                        <img src={profilePicUrl} alt='Pic' />
                        <div className='comment-content-div'>
                            <div>
                                <span style={{ color: '#2AC0D1', fontWeight: 500 }}>{username}</span>
                                <span className='dot' style={{ color: 'grey' }}>.</span>
                                <span style={{ color: 'grey', fontSize: 12 }}>{dateTimeConstant}</span>
                            </div>
                            <span>{currentCommentContent}</span>
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
                                <span className='comment-action' onClick={() => deleteSubComment(id)}>Delete</span>
                                <span className='dot'>.</span>
                            </span>
                        </div>
                    </div>
                    :
                    <EditComment
                        isVisible={isEditing}
                        profilePicUrl={profilePicUrl}
                        currentCommentContent={currentCommentContent}
                        setCurrentCommentContent={(x) => setCurrentCommentContent(x)}
                        setIsEditing={setIsEditing}
                    />}
                {
                    subComments.length > 0 ?
                        subComments.map(comment =>
                        (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                currentCommentContent={comment.commentContent}
                                username={comment.username}
                                profilePicUrl={comment.profilePicUrl}
                                currentSubComments={comment.subComments || []}
                                commentDateTime={comment.commentDateTime}
                                likes={comment.likes}
                                liked={comment.liked}
                                deleteComment={(id) => deleteComment(id)}
                            />
                        )
                        )

                        :
                        null
                }
            </div>
            <ReplyComment isVisible={canReply} username={username} setSubComments={setSubComments} setCanReply={setCanReply} />
        </React.Fragment>
    );
}

export default SubComment;