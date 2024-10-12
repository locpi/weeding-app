package fr.loicpincon.service;

import fr.loicpincon.dao.repo.GroupPeopleRepository;
import fr.loicpincon.dao.v2.PeopleGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GroupPeopleService {

	@Autowired
	private GroupPeopleRepository repository;

	public List<PeopleGroup> findAll() {
		return repository.findAll();
	}

	public PeopleGroup findById(Long id) {
		return repository.findById(id).orElse(null);
	}

	public PeopleGroup save(PeopleGroup organizerPeople) {
		if (organizerPeople.getUuid() == null) {
			organizerPeople.setUuid(UUID.randomUUID());
		}
		return repository.save(organizerPeople);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public PeopleGroup findByUuid(UUID uuid) {
		return repository.findByUuid(uuid);
	}
}