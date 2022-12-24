import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransections } from "../features/transaction/transectionSlice";

export default function Form() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const { isLoading, isError } = useSelector((state)=> state.transection);


    const reset = () => {
        setName('');
        setType('');
        setAmount('');
    }
    const handleCrete = (e) => {
        e.preventDefault();
        dispatch(addTransections({
            name,
            type,
            amount: Number(amount) 
        }))
        reset()
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={handleCrete}>
                <div className="form-group">
                    <label for="transaction_name">Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="Enter title"
                        value={name}
                        onChange={ (e)=> setName(e.target.value) }
                    />
                </div>

                <div className="form-group radio">
                    <label for="transaction_type">Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === "income"}
                            onChange={(e)=> setType("income")}
                        />
                        <label for="transaction_type">Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            checked= {type === "expense"}
                            placeholder="Expense"
                            onChange={(e)=> setType("expense")}
                        />
                        <label for="transaction_type">Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label for="transaction_amount">Amount</label>
                    <input
                        required    
                        type="number"
                        placeholder="Enter Amount"
                        name="amount"
                        value={amount}
                        onChange={ (e)=> setAmount(e.target.value) }
                    />
                </div>

                {
                    !isLoading && isError && (
                        <p className="error">There was a error</p>
                    )
                }

                <button disabled={isLoading} type="submit" className="btn">Add Transaction</button>

            </form>
                {
                    editMode && (
                        <button className="btn cancel_edit">Cancel Edit</button>
                    )
                }

        </div>
    );
}
