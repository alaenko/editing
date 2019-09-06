import React, {Fragment} from 'react';
import ServiceAdd from './components/ServiceAdd';
import ServiceList from './components/ServiceList';
import ServiceEdit from './components/ServiceEdit';
import { useSelector} from 'react-redux';


function App() {
  const {editing} = useSelector(state => state.serviceEdit);
  return (
    <Fragment>
      {editing ? <ServiceEdit /> : <ServiceAdd />}
      <ServiceList />
    </Fragment>
  );
}

export default App;
