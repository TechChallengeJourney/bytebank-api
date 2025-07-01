import { Request, Response } from 'express';
import Transaction from '../models/transactionModel';
import mongoose from 'mongoose';
import User from '../models/userModel';
import { TransactionType } from '../enums/transactionType';

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
        const { userId, value, type, date } = req.body

        if (!userId || !value || !type || !date) {
            return res.status(400).json({ message: 'UserId, value, type e date são obrigatórios' })
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'userId inválido' });
        }

        if (!Object.values(TransactionType).includes(type)) {
            return res.status(400).json({ message: 'Tipo de movimentação inválido' })
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const newTransaction = await Transaction.create({ userId, value, type, date })
        return res.status(201).json(newTransaction)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao criar transação' })
    }
}

export const updateTransaction = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { userId, value, type, date } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Id da transação é obrigatório' });
        }

        if (!userId || !value || !type || !date) {
            return res.status(400).json({ message: 'UserId, value, type e date são obrigatórios' })
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'userId inválido' });
        }

        if (!Object.values(TransactionType).includes(type)) {
            return res.status(400).json({ message: 'Tipo de movimentação inválido' })
        }

        const user = await Transaction.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const newTransaction = await Transaction.create({ userId, value, type, date })
        return res.status(201).json(newTransaction)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao criar transação' })
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
        console.log(error)
        res.status(500).json({ message: 'Erro ao deletar Transação' })
        return;
    }
}