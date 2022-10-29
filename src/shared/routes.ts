import { Router } from "express";
import { MachineController } from "../modules/machines/machines.controller";
import { PiecesController } from "../modules/pieces/pieces.controller";

export const routes = Router();

const machinesController = new MachineController();
const piecesController = new PiecesController();

// Machines
routes.get('/machines', machinesController.list);
routes.post('/machines', machinesController.create);
routes.put('/machines/:id', machinesController.update);
routes.delete('/machine/:id', machinesController.delete);

// Pieces
routes.get('/pieces', piecesController.list);
routes.post('/pieces', piecesController.create);
routes.put('/pieces/:id', piecesController.update);
routes.delete('/pieces', piecesController.delete);
