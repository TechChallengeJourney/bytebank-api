import { Request, Response } from 'express';
import Extract from '../models/extractModel';
import mongoose from 'mongoose';
import User from '../models/userModel';
import { TransactionType } from '../enums/TransactionType';

export const getExtract = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.query

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ message: 'userId é obrigatório e deve ser uma string' })
        }

        const extracts = await Extract.find({ userId })
        return res.status(200).json(extracts)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao buscar extrato' })
    }
}

export const createExtract = async (req: Request, res: Response): Promise<any> => {
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

        const newExtract = await Extract.create({ userId, value, type, date })
        return res.status(201).json(newExtract)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao criar extrato' })
    }
}

export const updateExtract = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { userId, value, type, date } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Id do extrato é obrigatório' });
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

        const user = await Extract.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const newExtract = await Extract.create({ userId, value, type, date })
        return res.status(201).json(newExtract)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao criar extrato' })
    }
}

export const deleteExtract = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ message: 'Id do extrato é obrigatório' })
            return;
        }

        const deletedCard = await Extract.findByIdAndDelete(id);

        if (!deletedCard) {
            res.status(404).json({ message: 'Extrato não encontrado' })
            return;
        }

        res.status(200).json({ message: 'Extrato deletado com sucesso' })
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao deletar Extrato' })
        return;
    }
}