import { Request, Response } from "express";
import { prisma } from '../../shared/database';

interface IRequest {
  name: string;
  code_machine: string;
  quantity: number;
  image: string;
  machine_id: string;
}

interface IRequestDeletePiece {
  id: string;
  machine_id: string;
}

export class PiecesController {
  async list(request: Request, response: Response) {
    try {
      const pieces = await prisma.piece.findMany();

      return response.status(200).json(pieces);
    } catch (error) {
      console.log(error);
    }
    
  }

  async create(request: Request, response: Response) {
    const data = request.body as IRequest;
    try {
      await prisma.piece.create({
        data,
      });

      const machine = await prisma.machine.findFirst({
        where: {
          id: data.machine_id
        }
      });

      if (machine?.quantity_pieces !== undefined) {
        await prisma.machine.update({
          where: {
            id: data.machine_id
          }, data: {
            quantity_pieces: machine?.quantity_pieces + 1,
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = request.body as IRequest;
    try {
      await prisma.piece.update({
        where: {
          id,
        }, data
      });

      return response.status(201).end();
    } catch (error) {
      console.log(error);
    }
  }

  async delete(request: Request, response: Response) {
    const data = request.body as IRequestDeletePiece;

    try {
      await prisma.piece.delete({
        where: {
          id: data.id
        }
      })

      const machine = await prisma.machine.findFirst({
        where: {
          id: data.machine_id
        }
      });

      if (machine?.quantity_pieces !== undefined) {
        await prisma.machine.update({
          where: {
            id: data.machine_id
          }, data: {
            quantity_pieces: machine?.quantity_pieces - 1,
          }
        });
      }

      return response.status(204).end();
    } catch (error) {
      console.log(error);
    }
  }
}
