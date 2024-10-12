package fr.loicpincon.dao.v2;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class CostRepartition {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private OrganizerPeople organizerPeople;

	@ManyToMany
	private List<PeopleGroup> peopleGroups;
}
