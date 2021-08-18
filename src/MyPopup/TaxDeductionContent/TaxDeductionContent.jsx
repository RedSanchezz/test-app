import React, {useRef, useState} from 'react';
import EarlyPayments from './EarlyPayment/EarlyPayments';
import './TaxDeductionContent.scss';

function TaxDeductionContent(props) {
    //максимальная сумма вычета
    const maxDeductionAmount = props.maxDeductionAmount;
    //заполнили ли поле с зп
    let [withError, setError] = useState(false);
    // массив выплат в год
    let [earlyPayments, setEarlyPayments] = useState([]);
    //Input с зп
    let [salary, setSalary] = useState('');

    //скрытый блок, для вычисления позиции символа рубля
    const hiddenBlockRef = useRef(null);
    //блок со знаком валюты
    const currencySign = useRef(null);
    //блок с инпутом. Нужен для вычисления конечной позиции символа
    const salaryInput = useRef(null);

    function changeSalaryInputHandler(e){
        let value = e.currentTarget.value;
        validate();
        setSalary(value);

        if(value===''){
            currencySign.current.style.display='none';
        }else {
            currencySign.current.style.display='flex';

        }
        //сдвигаем символ рубля
        // получаем ширину скрытого поля
        let hiddenElem = hiddenBlockRef.current;
        hiddenElem.innerHTML=value;
        let hiddenBlockWidth =  hiddenElem.getBoundingClientRect().width;

        //задаем позицию символу рубля
        let leftPosition = hiddenBlockWidth - 4;
        let salaryInputWidth = salaryInput.current.getBoundingClientRect().width;

        // если символ валюты находится за пределами инпута
        if(salaryInputWidth<leftPosition+10){
            leftPosition = salaryInputWidth-10;
        }
        currencySign.current.style.left=leftPosition+'px';

        function validate() {
            //убираем все НЕ цифры
            value = value.replace(/\D/gi, '');
            //добавляем пробелы
            let mas = value.split('').reverse();
            mas=mas.map((elem, index)=>{
                if(index%3===0 && index!==0) return elem+' ';
                else return elem;
            })
            value = mas.reverse().join('');
        }
    }

    function clickPaymentsBtnHandler(e) {
        //убираем пробелы
        let salaryInt = salary.replace(' ', '');
        //если пустая строка - выводим ошибку
        //если введена слишком маленькая сумма - тоже ошибка
        if(salaryInt==='' || salaryInt<1000){
            setError(true);
            setEarlyPayments([]);
            return;
        }
        else setError(false);

        //записываем максимальную сумму выплат, в переменную, которую можем изменять
        let maxDeductionAmountTemp = maxDeductionAmount;
        //максимальная зарпалата в месяц
        let maxInYear = (salaryInt*12*0.13);

        //массив выплат в год
        let payments=[];
        while(maxDeductionAmountTemp>maxInYear){
            payments.push(Math.round(maxInYear));
            maxDeductionAmountTemp-=maxInYear;
        }

        payments.push(Math.round(maxDeductionAmountTemp));

        setEarlyPayments(payments);
    }

    return (
        <div className='tax-deduction__content'>
            <div onClick={()=>props.closePopup()} className='tax-deduction__close-btn'/>
            <div className='tax-deduction__content-title'>Налоговый вычет</div>
            <div className='tax-deduction__content-clue'>
                Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего  официального годового дохода.
            </div>
            <div className='tax-deduction__content-salary'>
                <div className='tax-deduction__content-salary-text'>Ваша зарплата в месяц</div>
                <div className={withError? 'tax-deduction__content-salary-input error': 'tax-deduction__content-salary-input'}>
                    <div ref = {currencySign} className='tax-deduction__content-currency-sign'>₽</div>
                    <input ref={salaryInput}
                           type='text'
                           onChange={changeSalaryInputHandler}
                           value={salary}
                           placeholder='Введите данные'
                    />
                    {withError && <div className='tax-deduction__content-salary-error'>Поле обязательно для заполнения</div>}
                    <div ref={hiddenBlockRef} className='tax-deduction__content-salary-input-hidden-block'>
                    </div>
                </div>
                <div
                    onClick={clickPaymentsBtnHandler}
                    className='tax-deduction__content-salary-button'>Рассчитать</div>
            </div>

            <EarlyPayments earlyPayments={earlyPayments}/>

            <div className='tax-deduction__what-reduction what-reduction'>
                <div className='what-reduction-text'>Что уменьшаем?</div>
                <div className='what-reduction-buttons'>
                    <div className='what-reduction-button red-btn'>Платёж</div>
                    <div className='what-reduction-button gray-btn'>Срок</div>
                </div>
            </div>
            <div className='tax-deduction__add-btn'>
                <div>Добавить</div>
            </div>
        </div>
    );
}

export default TaxDeductionContent;