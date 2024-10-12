package fr.loicpincon.service;

import fr.loicpincon.dao.repo.TimeLineRepository;
import fr.loicpincon.dao.v2.TimeLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TimeLineService {

	@Autowired
	private TimeLineRepository repository;

	public List<TimeLine> findAll() {
		return repository.findAll();
	}

	public TimeLine findById(Long id) {
		return repository.findById(id).orElse(null);
	}

	public TimeLine save(TimeLine timeLine) {
		if (timeLine.getUuid() == null) {
			timeLine.setUuid(UUID.randomUUID());
		}
		return repository.save(timeLine);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public TimeLine findByUuid(UUID uuid) {
		return repository.findByUuid(uuid);
	}
}