import { IPostRepository } from '../interfaces/IPostRepository';

class UpdatePostService {

  constructor(private PostRepository: IPostRepository) {}

  public async execute(title: string, content: string, userId: number) {
    const post = await this.PostRepository.update(title, content, userId);
    return post;
  }
}

export { UpdatePostService }