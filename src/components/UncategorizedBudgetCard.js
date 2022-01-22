import React from 'react';
import BudgetCard from './BudgetCard';
import useBudgets, { UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetsContext';
//using the getBudgetExpenses function and the UNCATEGORIZED_BUDGET_ID this function reduces to a single number by taking the amount entered and adding to the total expense.  If the amount is equal to 0 then nothing is returned
function UncategorizedBudgetCard(props) {
    const {getBudgetExpenses} = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0
    )
    if (amount === 0) return null
  return (
    <BudgetCard amount={amount} name="Uncategorized" gray {...props} />
  )
}

export default UncategorizedBudgetCard;
