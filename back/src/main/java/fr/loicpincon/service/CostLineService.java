package fr.loicpincon.service;


import fr.loicpincon.dao.repo.CostLineRepository;
import fr.loicpincon.dao.v2.CostLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CostLineService {

	@Autowired
	private CostLineRepository repository;

	public List<CostLine> findAll() {
		return repository.findAll();
	}

	public CostLine findById(Long id) {
		return repository.findById(id).orElse(null);
	}

	public CostLine save(CostLine costLine) {
		return repository.save(costLine);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}
}