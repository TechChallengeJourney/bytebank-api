import { Request, Response } from 'express';
import User from '../models/userModel';
import { WidgetKey } from '../enums/widgets.enum';
import Address from '../models/addressModel';
import { uploadFile } from '../services/fileService';

export const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await User.find().lean()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar usuários' })
    }
}

export const getUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id do usuário é obrigatório' })
        }
        const user = await User.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar usuário' })
    }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Id do usuário é obrigatório' })
        }

        if (!name && !email && !password) {
            return res.status(400).json({ message: 'Nome, email ou senha são obrigatórios' });
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (name) user.name = name
        if (email) user.email = email
        if (password) user.password = password

        const updatedUser = await user.save()

        return res.status(200).json({
            id: updatedUser._id.toString(),
            name: updatedUser.name,
            email: updatedUser.email
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
};

export const updateProfileImage = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const file = req.file;

        if (!id) {
            return res.status(400).json({ message: 'Id do usuário é obrigatório' })
        }

        if (!file) {
            return res.status(400).json({ message: 'Image é obrigatório' });
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const image = (req.file) ? await uploadFile(req, res) : null;

        user.image = image._id;

        const updatedUser = await user.save()

        return res.status(200).json({
            image: updatedUser.image
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar imagem' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Id do usuário é obrigatório' });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso' })
        return;
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
}

export const updateUserWidgets = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const widgets = req.body;
        
        if (!Array.isArray(widgets)) {
            return res.status(400).json({ message: 'Widgets deve ser um array de strings.' });
        }

        const validWidgets = Object.values(WidgetKey);
        const invalidWidgets = widgets.filter(w => !validWidgets.includes(w));

        if (invalidWidgets.length > 0) {
            return res.status(400).json({ message: `Widgets inválidos: ${invalidWidgets.join(', ')}` });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { selectedWidgets: widgets },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar os widgets do usuário.' });
    }
};

export const getAddress = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.params.id;
        const address = await Address.findOne({ userId }).lean()
        console.log(res)
        return res.status(200).json({ data: address, status: 200 })
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar endereço.' })
    }
}

export const updateAddress = async (req: Request, res: Response): Promise<any> => {
    const userId = req.params.id;
    const { address, city, state, code, complement } = req.body;

    try {
        const updatedAddress = await Address.findOneAndUpdate(
            { userId },
            { address, city, state, code, complement }
        );

        return res.status(200).json(updatedAddress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar o endereço.' });
    }
};