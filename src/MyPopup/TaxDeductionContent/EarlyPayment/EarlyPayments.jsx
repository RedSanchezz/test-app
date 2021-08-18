import React from 'react';
import EarlyPayment from './EarlyPayment/EarlyPayment';


function EarlyPayments(props) {
    const earlyPayments = props.earlyPayments;

    return (
        earlyPayments.length !==0 &&
        <div className='tax-deduction__content-early-payment early-payment'>
            <div className='early-payment__title'>Итого можете внести в качестве досрочных:</div>
            {earlyPayments.map((value, index)=>{
                return <EarlyPayment key={index}
                                          year={index+1}
                                          ceil={earlyPayments[index]}/>
            })}
        </div>
    )
}

export default EarlyPayments;