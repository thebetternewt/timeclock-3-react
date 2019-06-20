import { gql } from 'apollo-boost';

export const ALL_WORK_STUDY_PERIOD = gql`
	query AllWorkStudyPeriod($year: Int) {
		allWorkStudyPeriod(year: $year) {
			id
			year
			name
			startDate
			endDate
		}
	}
`;

export const CURRENT_WORK_STUDY_PERIOD = gql`
	query CurrentWorkStudyPeriod {
		workStudyPeriod {
			id
			year
			name
			startDate
			endDate
		}
	}
`;
