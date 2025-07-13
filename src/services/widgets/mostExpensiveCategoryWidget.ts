import Transaction from '../../models/transactionModel'
import Category from '../../models/categoryModel';

export const mostExpensiveCategoryWidget = async (userId: string) => {

    const expenses = await Transaction.aggregate([
        {
            $match: {
                userId: userId,
                type: 'expense'
            }
        },
        { $group: { _id: '$categoryId', total: { $sum: '$value' } } },
        { $sort: { total: -1 } },
        { $limit: 1 }
    ])

    const data = expenses[0];

    const category = await Category.findById(data._id).lean()

    return {
        category: category?.name || 'Sem dados',
        value: data?.total || 0
    }
}
