import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { editChangeServiceField, editServiceCancel, EditService } from '../actions/actionCreators';

function ServiceEdit() {
  const {item, loading, error} = useSelector(state => state.serviceEdit);
  const dispatch = useDispatch();

  const handleChange = evt => {
    const {name, value} = evt.target;
    dispatch(editChangeServiceField(name, value));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(EditService());
  }
  
  const handleCancel = () => {
    dispatch(editServiceCancel());
  }
  
  
    return (
      <form onSubmit={handleSubmit}>
        <input name='name' onChange={handleChange} value={item.name} />
        <input name='price' onChange={handleChange} value={item.price} />
        <button type='submit' disabled={loading}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
        {error && <p>Something went wrong try again</p>}
      </form>
    )
}

export default ServiceEdit;
