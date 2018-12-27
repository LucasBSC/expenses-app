import uuid from 'uuid'
import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'
import moment from 'moment'

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }    
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ expenses[0], expenses[2] ])
})

test('should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    }    
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description: 'Test',
            note: 'test note',
            amount: 1000,
            createdAt: moment(0)
        }
    }

    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, action.expense])
})


test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            description: 'Water bill'
        }
    }

    const state = expensesReducer(expenses, action)
    expect(state[1].description).toBe('Water bill')
})

test('should not edit an expense if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates: {
            description: 'Water bill'
        }
    }

    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

