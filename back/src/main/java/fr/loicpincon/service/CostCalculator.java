package fr.loicpincon.service;


import fr.loicpincon.dao.repo.GuestRepository;
import fr.loicpincon.dao.v2.CostLine;
import fr.loicpincon.dao.v2.CostRepartition;
import fr.loicpincon.dao.v2.OrganizerPeople;
import fr.loicpincon.dao.v2.PeopleGroup;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CostCalculator {

	private final GuestRepository guestRepository;

	// Function to calculate cost per organizer
	public double calculateCostPerOrganizer(CostLine event, OrganizerPeople organizer) {
		double total = 0.0;

		List<PeopleGroup> peopleGroups = new ArrayList<>();

		event.getRepartition()
				.stream()
				.map(CostRepartition::getPeopleGroups)
				.forEach(f -> {
					f.forEach(g -> addPeopleGroupIfExist(g, peopleGroups));
				});

		final int sum = peopleGroups.stream().mapToInt(f -> f.getNumberOfPeople()).sum();

		for (PeopleGroup peopleGroup : peopleGroups) {
			peopleGroup.setNumberOfPeople(guestRepository.numberByCode(peopleGroup.getLabel()));
			if (actualOrganizeConcerned(peopleGroup, organizer, event.getRepartition())) {
				final int i = peopleGroup.getNumberOfPeople() * 100 / sum;
				log.info("group {} represent {} %", peopleGroup.getId(), i);

				double pricePorcent = i * event.getTotal() / 100;
				log.info("group {} represent {} euros", peopleGroup.getId(), pricePorcent);
				final List<OrganizerPeople> organizerPeople = numberOfOrganizerOnPeopleGroup(peopleGroup, event.getRepartition());
				final int i1 = organizerPeople.size();
				log.info("{} organize paye pour {}", i1, peopleGroup.getId());
				total += pricePorcent / i1;
			}


		}


		log.info(peopleGroups.size() + " people groups");
		return total;

	}

	private void addPeopleGroupIfExist(PeopleGroup peopleGroup, List<PeopleGroup> peopleGroups) {
		final boolean empty = peopleGroups.stream().filter(f -> f.getId().equals(peopleGroup.getId())).toList().isEmpty();
		if (empty) {
			peopleGroups.add(peopleGroup);
		}
	}

	private List<OrganizerPeople> numberOfOrganizerOnPeopleGroup(PeopleGroup peopleGroup, List<CostRepartition> costRepartitions) {
		List<OrganizerPeople> organizerPeople = new ArrayList<>();
		for (CostRepartition costRepartition : costRepartitions) {
			for (PeopleGroup pg : costRepartition.getPeopleGroups()) {
				if (pg.getId().equals(peopleGroup.getId())) {
					organizerPeople.add(costRepartition.getOrganizerPeople());
				}
			}
		}
		return organizerPeople;
	}

	private boolean actualOrganizeConcerned(PeopleGroup peopleGroup, OrganizerPeople actual, List<CostRepartition> costRepartitions) {
		for (CostRepartition costRepartition : costRepartitions) {
			if (costRepartition.getOrganizerPeople().getId().equals(actual.getId())) {
				for (PeopleGroup pg : costRepartition.getPeopleGroups()) {
					if (pg.getId().equals(peopleGroup.getId())) {
						return true;
					}
				}
			}

		}
		return false;
	}

}