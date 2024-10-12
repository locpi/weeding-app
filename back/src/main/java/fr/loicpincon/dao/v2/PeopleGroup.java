package fr.loicpincon.dao.v2;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Entity
public class PeopleGroup {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String label;

	private UUID uuid;

	@ManyToMany
	private List<OrganizerPeople> peoples;

	private transient int numberOfPeople = 10;

}
