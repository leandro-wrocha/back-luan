import { Request, Response } from "express";
import { prisma } from '../../shared/database';

interface IRequest {
  name: string;
  code_machine: string;
  image: string;
  quantity_pieces: number;
}

export class MachineController {
  async list(request: Request, response: Response) {
    try {
      const machines = await prisma.machine.findMany();

      return response.status(200).json(machines);
    } catch (error) {
      console.log(error);
    }
  }

  async find(request: Request, response: Response) {
    const { code_machine } = request.params;

    try {
      const machine = await prisma.machine.findFirst({
        where: {
          code_machine
        },
        include: {
          piece_machine: true,
        }
      })

      return response.status(200).json(machine)
    } catch (error) {
      console.log(error);
    }
  }

  async create(request: Request, response: Response) {
    const data = request.body as IRequest;
    try {
      const unique = await prisma.machine.findUnique({
        where: {
          code_machine: data.code_machine
        }
      })

      if (unique !== null) {
        return response.status(400).send({ message: "Essa máquina já existe" })
      }

      await prisma.machine.create({
        data
      });

      return response.status(201).end();
    } catch (error) {
      console.log(error);
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = request.body as IRequest;
    try {
      await prisma.machine.update({
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
    const { id } = request.params;

    try {
      await prisma.machine.delete({
        where: {
          id
        }
      })

      return response.status(204).end();
    } catch (error) {
      console.log(error);
    }
  }
}
