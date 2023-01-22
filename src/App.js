import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Comment from './components/comment';
import AddComment from './components/addComment';
import getFakeComment from './utils/getFakeComment';
import getFakeCommentOfCurrentUser from './utils/getFakeCommentOfCurrentUser';
import getCurrentUserDetails from './utils/getCurrentUserDetails';
import './App.css';

function App() {
  const currentUser = getCurrentUserDetails();
  const [comments, setComments] = useState([]);
  const options = ['Date (Latest first)', 'Date (Oldest first)', 'Likes (Descending)', 'Likes (Ascending)'];

  const onOptionChangeHandler = (event) => {
    sortComments(parseInt(event.target.value));
  };

  const sortComments = (optionSelected) => {
    // 0 - date (latest first)
    // 1 - date (oldest first)
    // 2 - likes (descending)
    // 3 - likes (ascending)
    let newComments = [...comments];
    if (optionSelected === 0)
      newComments.sort((a, b) => b.commentDateTime - a.commentDateTime);
    else if (optionSelected === 1)
      newComments.sort((a, b) => a.commentDateTime - b.commentDateTime);
    else if (optionSelected === 2)
      newComments.sort((a, b) => b.likes - a.likes);
    else if (optionSelected === 3)
      newComments.sort((a, b) => a.likes - b.likes);
    let x = optionSelected;
    if(x === 0 || x === 1 || x === 2 || x === 3)
      setComments(newComments.map(comment => ({
        id: uuidv4(),
        ...comment
      })));
  };

  const generateFakeComment = useCallback(() => {
    const comment = getFakeComment();
    if (comment.likedBy.includes(currentUser.userId))
      comment.liked = true;
    else
      comment.liked = false;
    return comment;
  }, [currentUser.userId]);

  const generateFakeCommentByCurrentUser = useCallback(() => {
    const comment = getFakeCommentOfCurrentUser();
    if (comment.likedBy.includes(currentUser.userId))
      comment.liked = true;
    else
      comment.liked = false;
    return comment;
  }, [currentUser.userId]);

  const generateSampleApiData = useCallback(() => {
    const comment1 = generateFakeComment();
    const comment2 = generateFakeCommentByCurrentUser();
    const comment3 = generateFakeComment();
    const comment4 = generateFakeComment();
    comment1.subComments.push(comment2);
    comment3.subComments.push(comment4);
    comment1.subComments.push(comment3);
    const comment5 = generateFakeCommentByCurrentUser();

    return [
      comment1,
      comment5
    ];
  }, [generateFakeComment, generateFakeCommentByCurrentUser]);

  const deleteComment = (id) => {
    setComments(comments => comments.filter(comment => comment.id !== id));
  };

  const addComment = ({ id, commentContent, commentDateTime }) => {
    setComments(comments => ([
      ...comments,
      {
        id: id,
        profilePicUrl: getCurrentUserDetails().profilePicUrl,
        username: getCurrentUserDetails().username,
        commentContent: commentContent,
        commentDateTime: commentDateTime,
        likes: 0,
        likedBy: [],
        subComments: []
      }
    ]));
  };

  useEffect(() => {
    setComments(generateSampleApiData());
  }, [generateSampleApiData]);

  return (
    <div className='App'>
      <AddComment profilePicUrl={getCurrentUserDetails().profilePicUrl} addComment={addComment}/>
      <select onChange={onOptionChangeHandler} className='sort-select'>
        <option>Sort</option>
        {options.map((option, index) => {
          return <option key={index} value={index}>
            {option}
          </option>
        })}
      </select>
      {comments.map(comment =>
        <Comment
          key={comment.id}
          id={comment.id}
          profilePicUrl={comment.profilePicUrl}
          username={comment.username}
          currentCommentContent={comment.commentContent}
          likes={comment.likes}
          commentDateTime={comment.commentDateTime}
          liked={comment.liked}
          currentSubComments={comment.subComments}
          deleteComment={deleteComment}
        />
      )}
    </div>
  );
}

export default App;
