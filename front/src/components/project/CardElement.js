import React, { useContext } from 'react';

import ListForm from './UI/ListForm';
import EditForm from './UI/EditForm';
import AuthContext from './stores/AuthContext';

const CardElement = (props) => {
  const context = useContext(AuthContext);

  return props.data.map((project) =>
    context.editIdList.includes(project.id) ? (
      <EditForm
        key={project.id}
        project={project}
        callFetch={props.callFetch}
      />
    ) : (
      <ListForm
        key={project.id}
        isEditable={props.isEditable}
        project={project}
        callFetch={props.callFetch}
      />
    )
  );
};

export default CardElement;
