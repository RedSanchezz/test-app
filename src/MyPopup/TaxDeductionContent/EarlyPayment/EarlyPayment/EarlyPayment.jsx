import React, {useState} from 'react';
import './EarlyPayment.scss';

function EarlyPayment(props) {
    const [active, setActive] = useState(true);

    function getYearText(year) {

        //получаем вторую цифру с конца
        //12 ый, 113 ый ... и т.д.
        const twoDigig = year.toString()[year.toString().length-2];
        if(twoDigig==='1'){
            return `в ${year}-ый год`;
        }

        //получаем последнюю цифру
        let lastDigit = year.toString()[year.toString().length-1];

        switch(Number(lastDigit)) {
            case 1:
                return `в ${year}-ый год`;
            case 2: {
                if(year<10) return `во ${year}-ой год`;
                else return `в ${year}-ой год`;
            }
            case 3:
                return `в ${year}-ий год`;
            case 4:
                return `в ${year}-ый год`;
            case 5:
                return `в ${year}-ый год`;
            case 6:
                return `в ${year}-ой год`;
            case 7:
                return `в ${year}-ой год`;
            case 8:
                return `в ${year}-ой год`;
            case 9:
                return `в ${year}-ый год`;
            case 0:
                return `в ${year}-ый год`;
            default: return 'error';
        }

    }

    return (
        <div className='early-payment__item'>
            <label htmlFor={'early-payment-input-'+props.year}
                   className={active ? 'early-payment__label checked':'early-payment__label'}/>

            <input id={'early-payment-input-'+props.year} checked = {active} onChange={(e)=>{
                setActive(e.currentTarget.checked);
            }} type='checkbox'/>
            <div className='early-payment__ceil'>
                {props.ceil + ' рублей'}
                <span className='early-payment__year'> {getYearText(props.year)}</span>
            </div>
        </div>
    )
}

export default EarlyPayment;