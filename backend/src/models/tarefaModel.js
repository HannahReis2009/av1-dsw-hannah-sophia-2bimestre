import { prisma } from "../config/prisma.js";

export async function listar() {
  try {
    return await prisma.task.findMany();
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}

export async function buscarPorId(id) {
  try {
    return await prisma.task.findUnique({
      where: { id }
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}

export async function criar(data) {
  const payload = {
    title: data.title?.trim(),
    description: data.description ? data.description.trim() : null,
    completed: data.completed ?? false
  };

  return await prisma.task.create({
    data: payload
  });
}

export async function atualizar(id, data) {
  const updateData = {};

  if (data.title !== undefined) {
    updateData.title = data.title.trim();
  }
  if (data.description !== undefined) {
    updateData.description = data.description ? data.description.trim() : null;
  }
  if (data.completed !== undefined) {
    updateData.completed = data.completed;
  }

  try {
    return await prisma.task.update({
      where: { id },
      data: updateData
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}

export async function excluir(id) {
  try {
    return await prisma.task.delete({
      where: { id }
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}
