import mongoose from 'mongoose'
import Transaction from '../../models/transactionModel'
import Category from '../../models/categoryModel'

export const financialAnalysisWidget = async (userId: string) => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const transactions = await Transaction.find({
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: startOfMonth, $lte: now }
    }).lean()

    let income = 0
    let expense = 0
    const categoryTotals: { [categoryId: string]: number } = {}

    for (const t of transactions) {
        if (t.type === 'income') {
            income += t.value
        } else if (t.type === 'expense') {
            expense += t.value
            const categoryId = t.categoryId?.toString()
            if (categoryId) categoryTotals[categoryId] = (categoryTotals[categoryId] || 0) + t.value
        }
    }

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])
    const topCategoryId = sortedCategories[0]?.[0]
    const topCategoryTotal = sortedCategories[0]?.[1] || 0

    let topCategory = null

    if (topCategoryId) {
        const category = await Category.findById(topCategoryId).lean()
        if (category) {
            const percent = expense > 0 ? Math.round((topCategoryTotal / expense) * 100) : 0
            topCategory = { name: category.name, percent }
        }
    }

    return {
        income,
        expense,
        topCategory
    }
}