import { useDispatch, useSelector } from "react-redux";
import Transaction from "./Transaction";
import { fetchTransectios } from "../../features/transaction/transectionSlice";
import { useEffect } from "react";

export default function Transactions() {
    const dispatch = useDispatch();

    const {transections, isLoading, isError } = useSelector((state)=> state.transection);
    let content = null;

    useEffect(()=>{
        dispatch(fetchTransectios())
    },[dispatch])


    if(isLoading) content = <p>Loading....</p>

    if(!isLoading && isError) {
        content = <p className="error">There was an error occured</p>
    }

    if(!isLoading && !isError && transections?.length > 0){
        content = transections.map((transection)=>(
            <Transaction key={Transaction.id} transection={transection} />
        ))
    }


    if(!isLoading && !isError && transections?.length === 0){
        content = <p>NO Transection Found!</p>
    }
    
    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}
