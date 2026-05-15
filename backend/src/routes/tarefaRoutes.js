// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================
// Esta camada é responsável por:
// - Definir as rotas da aplicação
// - Mapear URLs para os controllers correspondentes
// - Organizar as rotas por recurso/entidade

import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

// Cria um roteador do Express
const router = express.Router();

// ========================================
// DEFINIÇÃO DAS ROTAS DE TAREFAS
// ========================================

/**
 * GET /tasks - Lista todos os registros Task
 */
router.get("/tasks", TarefaController.listar);

/**
 * GET /tasks/:id - Obtém um registro Task específico
 */
router.get("/tasks/:id", TarefaController.buscarPorId);

/**
 * POST /tasks - Cria um novo registro Task
 */
router.post("/tasks", TarefaController.criar);

/**
 * PUT /tasks/:id - Atualiza um registro Task
 */
router.put("/tasks/:id", TarefaController.atualizar);

/**
 * DELETE /tasks/:id - Remove um registro Task
 */
router.delete("/tasks/:id", TarefaController.excluir);

// Exporta o roteador para ser usado no app principal
export default router;
