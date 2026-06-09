import { Injectable } from '@nestjs/common';
import { PostInterface } from './interfaces/post.interface';

@Injectable()
export class PostsService {

    private post: PostInterface[] = [
        {
            id: 1,
            title: "Post 1",
            content: "Content 1",
            authorName: "Author 1",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    findAll() {
        return this.post
    }

    findOne(id: number): PostInterface {
        return {
            id: 4,
            title: "string",
            content: "string",
            authorName: "string",
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
}
