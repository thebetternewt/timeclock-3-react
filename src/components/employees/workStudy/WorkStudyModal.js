import React from 'react';

import Modal from '../../../styled/layouts/Modal';
import WorkStudyForm from './WorkStudyForm';

const WorkStudyModal = ({ close, employee, departments, workStudy }) => (
	<Modal title={workStudy ? `Edit Work Study` : `Add Work Study`} close={close}>
		<WorkStudyForm
			employee={employee}
			departments={departments}
			close={close}
			workStudy={workStudy}
		/>
	</Modal>
);

export default WorkStudyModal;
