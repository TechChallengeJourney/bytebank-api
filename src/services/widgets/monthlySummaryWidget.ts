import Transaction from '../../models/transactionModel';
import mongoose from 'mongoose';

export const monthlySummaryWidget = async (userId: string) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const currentDay = today.getDate();

    const transactions = await Transaction.aggregate([
        {
            $match: {
                userId,
                createdAt: { $gte: startOfMonth, $lte: today },
            },
        },
        {
            $project: {
                day: { $dayOfMonth: '$createdAt' },
                type: 1,
                value: 1,
            },
        },
        {
            $group: {
                _id: { day: '$day', type: '$type' },
                total: { $sum: '$value' },
            },
        },
    ]);

    const incomeData: number[] = Array(currentDay).fill(0);
    const expenseData: number[] = Array(currentDay).fill(0);

    transactions.forEach((item) => {
        const dayIndex = item._id.day - 1;

        if (item._id.type === 'income') {
            incomeData[dayIndex] = item.total;
        } else if (item._id.type === 'expense') {
            expenseData[dayIndex] = item.total;
        }
    });

    return [
        {
            name: 'Receitas',
            data: incomeData,
        },
        {
            name: 'Despesas',
            data: expenseData,
        },
    ];
};
