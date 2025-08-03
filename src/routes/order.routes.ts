// POST /orders — создать заказ
// GET /orders/:id — получить заказ по id
// PUT /orders/:id — обновить заказ
// DELETE /orders/:id — удалить заказ
// GET /orders — получить список заказов (с фильтрацией по userId, пагинацией)


import express from 'express';

import service from "../services/order.service.js";

const onbordingRouter = express.Router();