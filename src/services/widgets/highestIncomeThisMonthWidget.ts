import Transaction from '../../models/transactionModel'
import Category from '../../models/categoryModel';

export const highestIncomeWidget = async (userId: string) => {

    const expenses = await Transaction.aggregate([
        {
            $match: {
                userId: userId,
                type: 'income'
            }
        },
        { $group: { _id: '$categoryId', total: { $sum: '$value' } } },
        { $sort: { total: -1 } },
        { $limit: 1 }
    ]);

    if(expenses.length !== 0) {
        const data = expenses[0];    
        const category = await Category.findById(data._id).lean();
        return category ? {
            category: category.name,
            value: data.total
        } : null;
    } 

    return null;
}
