import { Modal, Stack, Button } from 'react-bootstrap';
import useBudgets, { UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetsContext';
import { currencyFormatter } from '../utils';


function ViewExpenseModal({ budgetId, handleClose, defaultBudgetId }) {

    const { deleteExpense, budgets, deleteBudget, getBudgetExpenses } = useBudgets()

    const expenses = getBudgetExpenses(budgetId)
    //if out budgetId is equal to UNCATEGORIZED_BUDGET_ID then it is put in the Uncategorized budget otherwise it is return in the named category that is named for that budgetId
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId
        ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
        : budgets.find(b => b.id === budgetId)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction='horizontal' gap='2'>
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button onClick={() => {
                                deleteBudget(budget)
                                handleClose()
                            }} variant='outlined-danger'>Delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='vertical' gap='3'>
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap='2' key={expense.id}>
                            <div className='me-auto fs-4'>{expense.description}</div>
                            <div className='fs-5'>{currencyFormatter.format(expense.amount)}</div>
                            <Button size='sm' variant='outline-danger' onClick={() => deleteExpense(expense)}>&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}

export default ViewExpenseModal;
