import React, { useContext, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { TableContext } from '../../Context/TableContext';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const UpdateModal = (props) => {
    const context = useContext(TableContext);
    const { updateElement, user, selectedRow, selectItem} = context;
    const [modalVisibility, setModalVisibility] = useState(false);
    const [submitted, setSubmission] = useState(false);
    const [rate, setRate] = useState();

    const onInputTextChange = (event, name) => {
        const val = (event.target && event.target.value) || '';
        let _changedProduct = { ...selectedRow};

        _changedProduct[`${name}`] = val;

    }

    const onInputNumberChange = (event, name) => {
        const val = event.target.value || '';
        let _changedProduct = { ...selectedRow};
        _changedProduct[`${name}`] = val;
        setRate(val);
        selectItem(_changedProduct);
    }


    const saveProduct = () => {
        let flag = false;
        console.log(selectedRow)
        console.log(rate);
        if(rate === undefined || rate === ''){
            setSubmission(true);
            flag = true;
        }
        if(!flag){
            const tax = {
                ...selectedRow,
                rate: rate,
            }
            
            updateElement(tax, user)
            setSubmission(true)
        }
        
    }


    const onUpdateHandler = () => {
        setModalVisibility(true);
    }


    const Footer = (props) => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" className='p-button-text' onClick={() => { setModalVisibility(false) }}></Button>
                <Button label="Save" icon="pi pi-check" onClick={saveProduct}></Button>
            </div>
        )
    }




    return (
        <div className='card flex justify-content-center'>
            {!selectedRow ?<Button label = "Update" disabled></Button>:<Button label="Update" onClick={onUpdateHandler}></Button>}
            <Dialog header="Update process" style={{ width: '50vw' }} className='p-fluid' footer={Footer} visible={modalVisibility} onHide={() => setModalVisibility(false)}>
                <div className='formgrid grid'>
                    <div className='field col'>
                        <label htmlFor='short_description' className='font-bold'>Short Description</label>
                        <InputText disabled id='short_description' value={selectedRow ? selectedRow.short_description: []} onChange={(event) => { onInputTextChange(event, 'short_description') }}
                            required autoFocus className={classNames({ 'p-invalid block': submitted && !selectedRow['short_description'] })}></InputText>
                        {submitted && !selectedRow['short_description'] && <small className='p-error'>Short description is required</small>}
                    </div>
                    <div className='field col'>
                        <label htmlFor='description' className='font-bold'>Description</label>
                        <InputText id='description' disabled value={selectedRow ? selectedRow.description : []} onChange={(event) => { onInputTextChange(event, 'description') }}
                            required autoFocus className={classNames({ 'p-invalid block': (submitted &&  selectedRow['description']) === true })}></InputText>
                        {(submitted && !selectedRow['description']) && <small className='p-error'>Description is required</small>}
                    </div>
                        <label htmlFor='rate' className='font-bold'>Rate</label>
                        <InputNumber  id='rate' value={selectedRow ? selectedRow.rate : []} onValueChange={(event) => { onInputNumberChange(event, 'rate') }}
                        required autoFocus className={classNames({ 'p-invalid block': submitted &&  (rate || rate === '') })} useGrouping = {false}></InputNumber>
                        {submitted && !selectedRow['rate'] && <small className='p-error block'>Rate is required</small>}
                </div>
            </Dialog>
        </div>
    )
}

export default UpdateModal