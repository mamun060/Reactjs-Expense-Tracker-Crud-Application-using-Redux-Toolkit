import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransections, editTransections } from "../features/transaction/transectionSlice";

export default function Form() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const { isLoading, isError } = useSelector((state)=> state.transection);

    const {editing} = useSelector((state)=> state.transection || {} )

    // listen edit mode active
    useEffect(()=>{
        // console.log(editing);
        const {id, name, type, amount } = editing || {} ;
        if(id){
            setEditMode(true);
            setName(name)
            setType(type)
            setAmount(amount)
        } else {
            setEditMode(false)
            reset();
        }
    }, [editing])


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

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(editTransections({
            id: editing.id,
            data: {
                name: name,
                type: type,
                amount: amount
            }, 
        }))
        reset()
        setEditMode(false)
    }


    const cancelEditMode = () => {
        setEditMode(false)
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={ editMode ? handleUpdate : handleCrete }>
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

                {/* {
                    editMode ? (
                        <button disabled={isLoading} type="submit" className="btn">Update Transaction</button>
                    ) : <button disabled={isLoading} type="submit" className="btn">Add Transaction</button>
                } */}

                
                <button disabled={isLoading} type="submit" className="btn">
                    { editMode ? 'Update Transaction' : 'Add Transaction' }
                </button>

            </form>
                {
                    editMode && (
                        <button className="btn cancel_edit" onClick={cancelEditMode} >Cancel Edit</button>
                    )
                }

        </div>
    );
}
