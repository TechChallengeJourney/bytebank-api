import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Card from '../models/cardModel';
import User from '../models/userModel';

export const getCards = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await Card.find().lean()
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar cartões' });
    }
}

export const createCard = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, cardNumber, name, functions, variant } = req.body;

        if (!userId || !cardNumber || !name || !functions || !variant) {
            return res.status(400).json({ message: 'UserId, cardNumber, name, functions e variant são obrigatórios' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'userId inválido' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const existingCard = await Card.findOne({ cardNumber }).lean();

        if (existingCard) {
            return res.status(409).json({ message: 'Já existe um cartão com esse número' });
        }

        const newCard = await Card.create({ userId, cardNumber, name, functions, variant });
        return res.status(201).json(newCard);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro ao criar cartão' });
    }
};

export const updateCard = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { userId, cardNumber, name, functions, variant } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Id do cartão é obrigatório' });
        }

        if (userId) {
            return res.status(400).json({ message: 'O usuário do cartão não pode ser alterado'})
        }

        if (cardNumber) {
            return res.status(400).json({ message: 'O número do cartão não pode ser alterado'})
        }

        if (!name && !functions && !variant) {
            return res.status(400).json({ message: 'Nome, funções ou variante são obrigatórios' });
        }

        const card = await Card.findById(id)

        if (!card) {
            return res.status(404).json({ message: 'Cartão não encontrado' });
        }

        if (name) card.name = name
        if (functions) card.functions = functions
        if (variant) card.variant = variant

        const updatedCard = await card.save()

        return res.status(200).json(updatedCard);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
};

export const deleteCard = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ message: 'Id do cartão é obrigatório' })
            return;
        }

        const deletedCard = await Card.findByIdAndDelete(id);

        if (!deletedCard) {
            res.status(404).json({ message: 'Cartão não encontrado' })
            return;
        }

        res.status(200).json({ message: 'Cartão deletado com sucesso' })
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao deletar cartão' })
        return;
    }
}
