import { Request, Response } from 'express';
import Transaction from '../models/transactionModel';
import mongoose from 'mongoose';
import User from '../models/userModel';
import { TransactionType } from '../enums/transactionType';
import { uploadFile } from '../services/fileService';
import Category from '../models/categoryModel';
import Card from '../models/cardModel';

export const getTransaction = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.query

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ message: 'userId é obrigatório e deve ser uma string' })
        }

        const transactions = await Transaction.find({ userId })
        return res.status(200).json(transactions)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao buscar transação' })
    }
}

export const createTransaction = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, value, type, createdAt, categoryId, cardId } = req.body

        if (!userId || !value || !type || !createdAt || !categoryId) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatórios, por favor!' })
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'O id do usuário é inválido.' });
        }

        if (!Object.values(TransactionType).includes(type)) {
            return res.status(400).json({ message: 'Tipo de movimentação é inválido.' })
        }

        const isValidUser = await User.findById(userId);
        if (!isValidUser) {
            return res.status(400).json({ message: 'Usuário não foi encontrado, tente novamente por favor.' });
        }

        const isValidCategoy = await Category.findById(categoryId);
        if (!isValidCategoy) {
            return res.status(400).json({ message: 'Categoria não foi encontrada, tente novamente por favor.' });
        }

        if(cardId) {
            const isValidCard = await Card.findById(cardId);
            if (!isValidCard) {
                return res.status(400).json({ message: 'Cartão não encontrado, escolha outro por favor.' });
            }
        }

        const file = (req.file) ? await uploadFile(req, res) : null;

        const newTransaction = await Transaction.create({ userId, value, type, createdAt, categoryId, cardId, fileId: file?._id })
        return res.status(201).json(newTransaction)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro ao criar uma nova transação.' })
    }
}

export const updateTransaction = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { userId, value, type, createdAt, categoryId, cardId  } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Id da transação é obrigatório' });
        }

        if (!userId || !value || !type || !createdAt || !categoryId) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatórios, por favor!' })
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'O id do usuário é inválido.' });
        }

        if (!Object.values(TransactionType).includes(type)) {
            return res.status(400).json({ message: 'Tipo de movimentação inválido' })
        }

        const isValidUser = await User.findById(userId);
        if (!isValidUser) {
            return res.status(400).json({ message: 'Usuário não foi encontrado, tente novamente por favor.' });
        }

        const isValidCategoy = await Category.findById(categoryId);
        if (!isValidCategoy) {
            return res.status(400).json({ message: 'Categoria não foi encontrada, tente novamente por favor.' });
        }

        if(cardId) {
            const isValidCard = await Card.findById(cardId);
            if (!isValidCard) {
                return res.status(400).json({ message: 'Cartão não encontrado, escolha outro por favor.' });
            }
        }

        const file = (req.file) ? await uploadFile(req, res) : null;
        const newTransaction = await Transaction.create({ userId, value, type, createdAt, categoryId, cardId, fileId: file?._id })
        return res.status(201).json(newTransaction)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao atualizar a transação, tente novamente por favor.' })
    }
}

export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ message: 'Id do transação é obrigatório' })
            return;
        }

        const deletedCard = await Transaction.findByIdAndDelete(id);

        if (!deletedCard) {
            res.status(404).json({ message: 'Transação não encontrada' })
            return;
        }

        res.status(200).json({ message: 'Transação deletada com sucesso' })
        return;
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar Transação' })
        return;
    }
}