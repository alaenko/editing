import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  REMOVE_SERVICE,
  EDIT_SERVICE_CANCEL,
  EDIT_SERVICE_SUCCESS,
  HANDLE_EDIT_SERVICE,
  CHANGE_SERVICE,
  EDIT_CHANGE_SERVICE_FIELD
} from './actionTypes';

export const changeService = editedItem => ({
  type: CHANGE_SERVICE,
  payload: {
    editedItem
  }
});

export const editServiceSuccess = () => ({
  type: EDIT_SERVICE_SUCCESS
});

export const editServiceCancel = () => ({
  type: EDIT_SERVICE_CANCEL
}); 

export const handleEditService = editingItem => ({
  type: HANDLE_EDIT_SERVICE,
  payload: {
    editingItem
  }
});

export const editChangeServiceField = (name, value) => ({
  type: EDIT_CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const fetchServicesRequest =() => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
  },
})

export const addServiceFailure = message => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    message,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const removeService = id => ({
  type: REMOVE_SERVICE,
  payload: {
    id,
  },
});

export const removeEditingService = (id) => (dispatch, getState) => {
  dispatch(removeService(id));
  const {serviceEdit: {item: editedItem}} = getState();
  if (id === editedItem.id) dispatch(editServiceSuccess());
};

export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    dispatch(fetchServicesSuccess(data));
  } catch (error) {
    dispatch(fetchServicesFailure(error.message));
  }
};

export const addService = () => async (dispatch, getState) => {
  dispatch(addServiceRequest());
  const {serviceAdd: {item: {name, price}}} = getState();

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, price}),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }

  dispatch(fetchServices());
};

export const EditService = () => (dispatch, getState) => {
  const {serviceEdit: {item: editedItem}} = getState();
  dispatch(changeService(editedItem));
  dispatch(editServiceSuccess());
};
