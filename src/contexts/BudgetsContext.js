import React, {useContext} from "react";
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'
// allows you to pass around information easily
const BudgetsContext = React.createContext()

export default function useBudgets(){
    return useContext(BudgetsContext)
}
//creates the Uncategorized budget option
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export const BudgetsProvider = ({children}) => {
    //stores in localStorage
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])
//this fuction filters through the expense array and returns expense with the same id
    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    //returns the previous expenses array add the new expense to the array
    function addExpense({description, amount, budgetId}){
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), amount, description,budgetId }]
        })
    }
    //if there's a previous budget where the name is the same it will return the previous budget and add the new budget to the existing array
    function addBudget({name, max}){
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidV4(), name, max}]
        })
    }
     //deletes expense that does not have the current id
    function deleteExpense({id}){
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }
    //first takes the previous expenses maps through array if the id doesn't match  returns the expense and moves into the Uncategory section
    function deleteBudget({id}){
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
            })
        })
       //deletes budget that does not have the current id
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
//everything inside BudgetsContext.Provider is available throughout the app
    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteExpense,
        deleteBudget
    }}>{children}</BudgetsContext.Provider>
}