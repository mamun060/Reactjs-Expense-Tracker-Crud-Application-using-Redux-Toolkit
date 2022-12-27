import { useSelector } from "react-redux";
import numberWithCommas from "../utils/numberComma";

export default function Balance() {
    const {transections} = useSelector((state)=> state.transection)

    const calculateIncome = (transections) => {
        let income = 0;

        transections.forEach(transection => {
            const { type, amount } = transection || {};
            if(type === 'income'){
                income += amount;
            } else {
                income -= amount
            }
        });
        return income;
    };


    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳ </span>
                {
                    transections?.length > 0 ? 
                    (
                        <span>{numberWithCommas(calculateIncome(transections))}</span>
                    ) : 0
                }
            </h3>
        </div>
    );
}
