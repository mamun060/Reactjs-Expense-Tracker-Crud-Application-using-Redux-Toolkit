import { useEffect } from "react";
import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { deleteTransections, editActive, fetchTransectios } from "../../features/transaction/transectionSlice";

export default function Transaction({transection}) {
    const dispatch = useDispatch();

    const {name, amount, type, id} = transection || {};

    const handleEdit = () => {
        dispatch(editActive(transection))
    }

    const handleDelete = () => {
        dispatch(deleteTransections(id))
    }



    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {amount}</p>
                <button className="link" onClick={handleEdit}>
                    <img alt="Edit" className="icon" src={editImage} />
                </button>
                <button className="link" onClick={handleDelete} >
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}
