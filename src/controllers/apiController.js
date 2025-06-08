const express = require('express');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const dataPath = path.join(__dirname, '../data/data.json');

// Read data from JSON file
const readData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

// Write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        // Garante que todos os campos estejam presentes e id seja string
        const formatted = users.map(u => ({
            id: String(u.id),
            name: u.name || '',
            email: u.email || '',
            password: u.password || ''
        }));
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: err.message });
    }
};

// Update user data
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { id },
            updatedUser,
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            id: String(user.id),
            name: user.name,
            email: user.email,
            password: user.password
        });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOneAndDelete({ id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar usuário', error: err.message });
    }
};

// POST /users - cria um novo usuário
exports.createUser = async (req, res) => {
    try {
        const { id, name, email, password } = req.body;
        console.log('POST /users body:', req.body); // LOG
        if (!id || !name || !email || !password) {
            console.log('POST /users erro: campos obrigatórios faltando'); // LOG
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }
        const exists = await User.findOne({ id });
        if (exists) {
            console.log('POST /users erro: usuário já existe'); // LOG
            return res.status(409).json({ message: 'Usuário com esse id já existe.' });
        }
        const user = new User({ id, name, email, password });
        await user.save();
        console.log('POST /users sucesso:', user); // LOG
        res.status(201).json({ id, name, email, password });
    } catch (err) {
        console.error('POST /users erro:', err); // LOG
        res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
    }
};

// Extracts
exports.getExtracts = (req, res) => {
    const data = readData();
    res.json(data.extracts || []);
};

exports.updateExtract = (req, res) => {
    const { id } = req.params;
    const updatedExtract = req.body;
    const data = readData();
    const extractIndex = data.extracts.findIndex(extract => extract.id == id);
    if (extractIndex === -1) {
        return res.status(404).json({ message: 'Extract not found' });
    }
    data.extracts[extractIndex] = { ...data.extracts[extractIndex], ...updatedExtract };
    writeData(data);
    res.json(data.extracts[extractIndex]);
};

exports.deleteExtract = (req, res) => {
    const { id } = req.params;
    const data = readData();
    const extractIndex = data.extracts.findIndex(extract => extract.id == id);
    if (extractIndex === -1) {
        return res.status(404).json({ message: 'Extract not found' });
    }
    data.extracts.splice(extractIndex, 1);
    writeData(data);
    res.status(204).send();
};

// Cards
exports.getCards = (req, res) => {
    const data = readData();
    // Garante que todos os campos estejam presentes e id seja string
    const cards = (data.cards || []).map(c => ({
        id: String(c.id),
        userId: String(c.userId),
        cardNumber: c.cardNumber || '',
        name: c.name || '',
        functions: Array.isArray(c.functions) ? c.functions : [],
        variant: c.variant || ''
    }));
    res.json(cards);
};

exports.updateCard = (req, res) => {
    const { id } = req.params;
    const updatedCard = req.body;
    const data = readData();
    const cardIndex = data.cards.findIndex(card => card.id == id);
    if (cardIndex === -1) {
        return res.status(404).json({ message: 'Card not found' });
    }
    data.cards[cardIndex] = { ...data.cards[cardIndex], ...updatedCard };
    writeData(data);
    res.json(data.cards[cardIndex]);
};

exports.deleteCard = (req, res) => {
    const { id } = req.params;
    const data = readData();
    const cardIndex = data.cards.findIndex(card => card.id == id);
    if (cardIndex === -1) {
        return res.status(404).json({ message: 'Card not found' });
    }
    data.cards.splice(cardIndex, 1);
    writeData(data);
    res.status(204).send();
};