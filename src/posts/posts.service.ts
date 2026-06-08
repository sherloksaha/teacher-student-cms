import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {

    private post: Post[] = [
        {
            id:1,
            title:"Post 1",
            content:"Content 1",
            authorName:"Author 1",
            createdAt:new Date(),
            updatedAt:new Date()
        }
    ];

    findAll(){
        return this.post
    }
}
