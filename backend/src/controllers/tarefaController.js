// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TarefaModel from "../models/tarefaModel.js";

function parseId(req) {
  const id = Number(req.params.id);
  return Number.isNaN(id) ? null : id;
}

/**
 * Retorna todas as tarefas em formato JSON
 * @route GET /tarefas
 */
export async function listar(req, res) {
  try {
    const tarefas = await TarefaModel.listar();
    return res.json(tarefas);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    return res.status(500).json({ erro: "Erro ao listar tarefas" });
  }
}

/**
 * Retorna uma tarefa específica com base no id enviado na URL
 * @route GET /tarefas/:id
 */
export async function buscarPorId(req, res) {
  const id = parseId(req);
  if (id === null) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const tarefa = await TarefaModel.buscarPorId(id);
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    return res.json(tarefa);
  } catch (error) {
    console.error("Erro ao buscar tarefa por ID:", error);
    return res.status(500).json({ erro: "Erro ao buscar tarefa" });
  }
}

/**
 * Cria uma nova tarefa
 * @route POST /tarefas
 */
export async function criar(req, res) {
  const { title, description, completed } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ erro: "Título é obrigatório" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ erro: "completed deve ser boolean" });
  }

  try {
    const tarefaCriada = await TarefaModel.criar({
      title: title.trim(),
      description: description !== undefined ? description?.trim() ?? null : null,
      completed: completed ?? false
    });

    return res.status(201).json(tarefaCriada);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res.status(500).json({ erro: "Erro ao criar tarefa" });
  }
}

/**
 * Atualiza parcialmente uma tarefa existente
 * @route PATCH /tarefas/:id
 */
export async function atualizar(req, res) {
  const id = parseId(req);
  if (id === null) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const { title, description, completed } = req.body;
  const data = {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ erro: "Título inválido" });
    }
    data.title = title.trim();
  }

  if (description !== undefined) {
    if (description !== null && typeof description !== "string") {
      return res.status(400).json({ erro: "description deve ser string ou null" });
    }
    data.description = description !== null ? description?.trim() ?? null : null;
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ erro: "completed deve ser boolean" });
    }
    data.completed = completed;
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ erro: "Nenhum campo para atualizar" });
  }

  try {
    const tarefaAtualizada = await TarefaModel.atualizar(id, data);
    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    return res.json(tarefaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
}

/**
 * Remove uma tarefa pelo id
 * @route DELETE /tarefas/:id
 */
export async function excluir(req, res) {
  const id = parseId(req);
  if (id === null) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const tarefaRemovida = await TarefaModel.excluir(id);
    if (!tarefaRemovida) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    return res.json(tarefaRemovida);
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    return res.status(500).json({ erro: "Erro ao excluir tarefa" });
  }
}
