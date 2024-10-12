package fr.loicpincon.service;

import fr.loicpincon.dao.v2.CostLine;
import fr.loicpincon.dao.v2.CostRepartition;
import fr.loicpincon.dao.v2.OrganizerPeople;
import fr.loicpincon.dao.v2.PeopleGroup;
import fr.loicpincon.model.CostObject;
import fr.loicpincon.model.CostPayment;
import fr.loicpincon.model.CostType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CostCalculatorTest {

	private final CostCalculator costCalculator = new CostCalculator();

	PeopleGroup A = buildPeopleGroup(1L, 95);

	PeopleGroup B = buildPeopleGroup(2L, 5);

	OrganizerPeople LP = buildORrganizer(1L);

	OrganizerPeople LT = buildORrganizer(2L);

	private CostLine testObject;

	private OrganizerPeople buildORrganizer(Long id) {
		OrganizerPeople organizerPeople = new OrganizerPeople();
		organizerPeople.setId(id);
		return organizerPeople;
	}

	@BeforeEach
	void setUp() {
		testObject = new CostLine();
		testObject.setName("Test");
		testObject.setPriceFixe(100);
		testObject.setType(CostType.FIXE);
		testObject.setObject(CostObject.OTHER);
		testObject.setPaymentType(CostPayment.CASH);

		List<CostRepartition> repartitions = new ArrayList<>();
		testObject.setRepartition(repartitions);
	}


	@Test
	void testForOneOrgaAndOneGroup() {
		CostRepartition repartition1 = createRepartition(LP, A);
		testObject.getRepartition().add(repartition1);
		double actualCost = costCalculator.calculateCostPerOrganizer(testObject, LP);
		assertEquals(100, actualCost, 0.01, "Le coût calculé ne correspond pas au coût attendu pour des groupes qui se chevauchent");
	}

	@Test
	void testForTwoOrgaAndOneGroup() {
		CostRepartition repartition1 = createRepartition(LP, A);
		CostRepartition repartitionLt = createRepartition(LT, A);

		testObject.getRepartition().addAll(
				List.of(repartitionLt, repartition1)
		);
		double actualCost = costCalculator.calculateCostPerOrganizer(testObject, LP);
		assertEquals(50, actualCost, 0.01, "Le coût calculé ne correspond pas au coût attendu pour des groupes qui se chevauchent");
	}

	@Test
	void testForTwoOrgaAndTwoGroup() {
		CostRepartition repartition1 = createRepartition(LP, A);
		CostRepartition repartitionLt = createRepartition(LT, B);

		testObject.getRepartition().addAll(
				List.of(repartitionLt, repartition1)
		);
		double actualCost = costCalculator.calculateCostPerOrganizer(testObject, LP);
		double actualCostLT = costCalculator.calculateCostPerOrganizer(testObject, LT);
		assertEquals(5, actualCostLT, 0.01, "Le coût calculé ne correspond pas au coût attendu pour des groupes qui se chevauchent");

		assertEquals(95, actualCost, 0.01, "Le coût calculé ne correspond pas au coût attendu pour des groupes qui se chevauchent");
	}

	@Test
	void testForTwoOrgaAndTwoGroupAndOneOrgaSame() {
		CostRepartition repartition1 = createRepartition(LP, A);
		repartition1.getPeopleGroups().add(B);
		CostRepartition repartitionLt = createRepartition(LT, B);

		testObject.getRepartition().addAll(
				List.of(repartitionLt, repartition1)
		);
		double actualCost = costCalculator.calculateCostPerOrganizer(testObject, LP);
		double actualCostLT = costCalculator.calculateCostPerOrganizer(testObject, LT);
		assertEquals(2.5, actualCostLT, 0.01, "Le coût calculé ne correspond pas au coût attendu pour des groupes qui se chevauchent");

		assertEquals(97.5, actualCost, 0.01, "Le coût calculé ne correspond pas au coût attendu pour des groupes qui se chevauchent");
	}


	private CostRepartition createRepartition(OrganizerPeople organizerLabel, PeopleGroup peopleGroup) {
		CostRepartition repartition = new CostRepartition();
		repartition.setOrganizerPeople(organizerLabel);
		List<PeopleGroup> peopleGroups = new ArrayList<>();
		peopleGroups.add(peopleGroup);
		repartition.setPeopleGroups(peopleGroups);
		return repartition;
	}

	private PeopleGroup buildPeopleGroup(Long id, int size) {
		PeopleGroup peopleGroup = new PeopleGroup();
		peopleGroup.setId(id);
		peopleGroup.setNumberOfPeople(size);
		return peopleGroup;
	}
}