import React from 'react';
import BudgetCard from './BudgetCard';
import useBudgets from '../contexts/BudgetsContext';

function TotalBudgetCard(props) {
    //uses the expenses and budgets from useBudgets function reduces eaxh to a single number by adding the total to the current expense amount and also adding the total to current max budget unless budget is equal to 0 it returns nothing
    const { expenses, budgets } = useBudgets()
    const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
    const max = budgets.reduce((total, budget) => total + budget.max, 0)
    if (max === 0) return null
    return (
        <BudgetCard amount={amount} name="Total" gray max={max} hideButtons/>
    )
}

export default TotalBudgetCard;
