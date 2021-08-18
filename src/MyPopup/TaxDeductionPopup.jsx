import React from 'react';
import TaxDeductionContent from './TaxDeductionContent/TaxDeductionContent';

import './TaxDeductionPopup.scss';



function TaxDeductionPopup(props) {

    const isOpen= props.isOpen;
    const closePopup = props.closePopup;
    //Цена квартиры передается в пропсах снаружи
    const apartmentPrice = props.apartmentPrice;
    //максимальная сумма вычета
    let maxDeductionAmount;

    //если цена квартиры больше 2 миллионов, максимальная сумма вычета - 260 т.р.
    if(apartmentPrice>2000000) maxDeductionAmount=260000;
    else maxDeductionAmount = (apartmentPrice/100*13).toFixed(2);

    return (
        <div className={isOpen?  'tax-deduction ' : 'tax-deduction closed' }>
                <TaxDeductionContent closePopup={closePopup}
                                isOpenPopup={isOpen}
                                maxDeductionAmount={maxDeductionAmount}
                />
        </div>
    );
}

export default TaxDeductionPopup;





