import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const getFakeComment = () => {
    return {
        id: uuidv4(),
        commentContent: faker.lorem.sentences(Math.ceil(Math.random()*5)),
        username: faker.name.fullName(),
        profilePicUrl: faker.internet.avatar(),
        commentDateTime: faker.datatype.datetime({ min: (new Date('2015-01-01').getTime()),max: (new Date()).getTime() }),
        likes: Math.ceil(Math.random()*100),
        likedBy: [],
        subComments: []
    };
}

export default getFakeComment;