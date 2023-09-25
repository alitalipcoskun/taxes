import React, { useContext, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { TableContext } from '../../Context/TableContext';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const AddModal = (props) => {
    const context = useContext(TableContext);
    const { addElement, user, biggest } = context;
    const [modalVisibility, setModalVisibility] = useState(false);
    const [product, setProduct] = useState({
        short_description: '',
        description: '',
        rate: ''
    });
    const [submitted, setSubmission] = useState(false);




    const onInputTextChange = (event, name) => {
        const val = event.target.value || '';
        let _changedProduct = { ...product};

        _changedProduct[`${name}`] = val;

        setProduct(_changedProduct);
    }

    const onInputNumberChange = (event, name) => {
        const val = event.target.value || '';
        let _changedProduct = { ...product };
        _changedProduct[`${name}`] = val;

        setProduct(_changedProduct);
    }


    const saveProduct = () => {
        const id = biggest ? biggest : 0;
        const cols = ['short_description', 'description', 'rate'];
        let flag = true;
        for(let i = 0; i < cols.length ; ++i){
            if(product[cols[i]] === undefined || product[[cols[i]]] === ""){
                flag = false;
                setSubmission(true)
            }
        }
        if (flag){
            const _productWithId = {
                ...product,
                id: id + 1
            }
            console.log(_productWithId)
            addElement(_productWithId, user)
            setSubmission(true)
        }
        
    }


    const onAddHandler = () => {
        setModalVisibility(true);
    }


    const Footer = () => {
        return (
            <div>
                <Button label="İptal" icon="pi pi-times" className='p-button-text' onClick={() => { setModalVisibility(false) }}></Button>
                <Button label="Kaydet" icon="pi pi-check" onClick={saveProduct}></Button>
            </div>
        )
    }




    return (
        <div className='card flex justify-content-center'>
            <Button label="Add" icon="pi pi-plus" severity='success' onClick={onAddHandler}></Button>
            <Dialog header="Ekleme işlemi" style={{ width: '50vw' }} modal className='p-fluid' footer={Footer} visible={modalVisibility} onHide={() => setModalVisibility(false)}>
                <div className='formgrid grid'>
                    <div className='field col'>
                        <label htmlFor='short_description' className='font-bold'>Short Description</label>
                        <InputText id='short_description' value={product.short_description} onChange={(event) => { onInputTextChange(event, 'short_description') }}
                            required autoFocus className={classNames({ 'p-invalid block': submitted && !product['short_description'] })}></InputText>
                        {submitted && !product['short_description'] && <small className='p-error block'>Name is required</small>}
                    </div>
                    <div className='field col'>
                        <label htmlFor='description' className='font-bold'>Description</label>
                        <InputText id='description' value={product.description} onChange={(event) => { onInputTextChange(event, 'description') }}
                            required className={classNames({ 'p-invalid block': submitted && !product.description })}></InputText>
                        {submitted && !product['description'] && <small className='p-error block'>Category is required</small>}
                    </div>
                    <div className='field col'>
                        <label htmlFor='rate' className='font-bold'>Rate</label>
                        <InputNumber id='rate' value={product.rate} onValueChange={(event) => { onInputNumberChange(event, 'rate') }}
                            required className={classNames({ 'p-invalid block': submitted && !product.rate})} useGrouping = {false}></InputNumber>
                        {(submitted && (!product['rate'] || product['rate'] === '')) && <small className='p-error block'>Quantity is required</small>}
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default AddModal
