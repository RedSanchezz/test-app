import React, {useState} from 'react';
import TaxDeductionPopup from './MyPopup/TaxDeductionPopup';
import './App.scss';


function App() {
    let [isOpenPopup, setOpenPopup] = useState(false);

    function openCloseButtonHandler() {
        setOpenPopup(!isOpenPopup);
    }
    return (
        <div className="App">
            <button onClick={openCloseButtonHandler} className='tax-deduction__button' >Налоговый вычет</button>
            <TaxDeductionPopup apartmentPrice={2000000}
                     isOpen={isOpenPopup}
                     closePopup={()=>setOpenPopup(false)}
            />

        </div>
  );
}

export default App;
