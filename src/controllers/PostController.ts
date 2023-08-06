import { Request, Response } from 'express'
import { prisma } from '../database';
import { CreatePostService } from '../service/CreatePostService';
import { PostRepository } from '../repositories/PostRepository';
import { UpdatePostService } from '../service/UpdatePostService';
import { userInfo } from 'os';

export default {

  /**
   * Cria um post.
   * @param request ,
   * @param response
   * @returns
   */
  async createPost(request: Request, response: Response) {
    try {
      const { title, content, userId } = request.body;

      const createPost = new CreatePostService(new PostRepository());
      const post = await createPost.execute(title, content, userId);

      return response.json({
        error: false,
        message: 'Post criado com sucesso!',
        status: 1,
        post
      });
    }
    catch (error) {
      return response.json({ message: error.message });
    }
  },

  /**
   * Lista um Post
   * @param request
   * @param response
   * @returns
   */
  async listPost(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const post = await prisma.post.findUnique({
        where: {
          id: Number(id)
        },
        select: {
          title: true,
          content: true,
          userId: true
        },
      })

      if (!post) {
        return response.json({
          error: true,
          message: 'Error: Post não encontrado!',
          status: 2
        });
      }

      return response.json({
        error: false,
        status: 1,
        post
      });
    }
    catch (error) {
      return response.json({ message: error.message });
    }
  },

  /**
   * Atualiza um post
   * @param request
   * @param response
   * @returns
   */
  async updatePost(request: Request, response: Response) {
    try {
      const { id, title, content } = request.body;

      // VERIFICA SE O POST EXISTE
      const postExists = await prisma.post.findUnique({
        where: {
          id: Number(id)
        },
        select: {
          title: true,
          content: true,
          userId: true
        },
      })

      // SE O POST NÃO EXISTE RETORNA ERROR
      if (!postExists) {
        return response.json({
          error: true,
          message: 'Error: Post não encontrado!',
          status: 2
        });
      }

      // ATUALIZA O POST
      const updatePost = new UpdatePostService(new PostRepository());
      const post = updatePost.execute(title, content, id);

      return response.json({
        error: false,
        message: 'Post Atualizado com Sucesso!',
        status: 1,
        post
      });
    }
    catch (error) {
      return response.json({ message: error.message });
    }
  },


  /**
   * Deleta um post
   * @param request
   * @param response
   * @returns
   */
  async deletePost(request: Request, response: Response) {
    try {
      const { id } = request.params;

      // VERIFICA SE O POST EXISTE
      const postExists = await prisma.post.findUnique({
        where: {
          id: Number(id)
        },
        select: {
          title: true,
          content: true,
          userId: true
        },
      })

      // SE O POST NÃO EXISTE RETORNA ERROR
      if (!postExists) {
        return response.json({
          error: true,
          message: 'Error: Post não encontrado!',
          status: 2
        });
      }

      // ATUALIZA O POST
      const post = await prisma.post.delete({
        where: {
          id: Number(request.params.id)
        }
      })

      return response.json({
        error: false,
        message: 'Post Deletado com Sucesso!',
        status: 1
      });
    }
    catch (error) {
      return response.json({ message: error.message });
    }
  },


}