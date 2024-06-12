import dayjs from "dayjs";

export function createFormDataObject(data: Record<string, any>) {
	return {
		issueDateInterval: {
		  startDate: dayjs(data.dateRange[0]).toISOString(),
		  endDate: dayjs(data.dateRange[1]).toISOString(),
		},
		searchContext: {
		  targetSearchEntitiesContext: {
			targetSearchEntities: [
			  {
				type: "company",
				sparkId: null,
				entityId: null,
				inn: data.inn,
				maxFullness: data.isFull,
				inBusinessNews: data.businessContext,
			  },
			],
			onlyMainRole: data.mainRole,
			tonality: data.tonality,
			onlyWithRiskFactors: data.riskFactors,
			riskFactors: {
			  and: [],
			  or: [],
			  not: [],
			},
			themes: {
			  and: [],
			  or: [],
			  not: [],
			},
		  },
		  themesFilter: {
			and: [],
			or: [],
			not: [],
		  },
		},
		attributeFilters: {
		  excludeTechNews: !data.technicalNews,
		  excludeAnnouncements: !data.announcements,
		  excludeDigests: !data.newsSummary,
		},
		similarMode: "duplicates",
		limit: data.documentCount,
		sortType: "sourceInfluence",
		sortDirectionType: "desc",
		intervalType: "month",
		histogramTypes: ["totalDocuments", "riskFactors"],
	  };
}