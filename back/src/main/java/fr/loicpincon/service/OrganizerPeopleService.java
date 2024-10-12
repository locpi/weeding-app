package fr.loicpincon.service;

import fr.loicpincon.dao.repo.OrganizerPeopleRepository;
import fr.loicpincon.dao.v2.OrganizerPeople;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OrganizerPeopleService {

	@Autowired
	private OrganizerPeopleRepository repository;

	public List<OrganizerPeople> findAll() {
		return repository.findAll();
	}

	public OrganizerPeople findById(Long id) {
		return repository.findById(id).orElse(null);
	}

	public OrganizerPeople save(OrganizerPeople organizerPeople) {
		if (organizerPeople.getUuid() == null) {
			organizerPeople.setUuid(UUID.randomUUID());
		}
		return repository.save(organizerPeople);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public OrganizerPeople findByUuid(UUID uuid) {
		return repository.findByUuid(uuid);
	}
}