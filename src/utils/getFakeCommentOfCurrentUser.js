import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import getCurrentUserDetails from './getCurrentUserDetails';

const getFakeCommentOfCurrentUser = () => {
    return {
        id: uuidv4(),
        commentContent: faker.lorem.sentences(Math.ceil(Math.random()*5)),
        username: getCurrentUserDetails().username,
        profilePicUrl: getCurrentUserDetails().profilePicUrl,
        commentDateTime: faker.datatype.datetime({ min: (new Date('2015-01-01').getTime()),max: (new Date()).getTime() }),
        likes: Math.ceil(Math.random()*100),
        likedBy: [getCurrentUserDetails().userId],
        subComments: []
    };
}

export default getFakeCommentOfCurrentUser;