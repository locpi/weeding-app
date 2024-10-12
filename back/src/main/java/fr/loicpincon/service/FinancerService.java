package fr.loicpincon.service;


import fr.loicpincon.dao.Financer;
import fr.loicpincon.dao.repo.FinancerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FinancerService {
	private final FinancerRepository financerRepository;

	private final PriceService priceService;

	@Transactional(readOnly = true)
	public List<Financer> getAllFinancers() {
		return financerRepository.findAll();
	}

	public List<PriceService.Result> priceBy() {
		return priceService.process();

	}

	@Transactional(readOnly = true)
	public Financer getFinancerById(Long id) {
		return financerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Financer not found with id: " + id));
	}

	@Transactional
	public Financer createFinancer(Financer financer) {
		if (financerRepository.existsByCode(financer.getCode())) {
			throw new RuntimeException("Financer already exists with code: " + financer.getCode());
		}
		financer.setId(null);
		return financerRepository.save(financer);
	}

	@Transactional
	public fr.loicpincon.dao.Financer updateFinancer(Long id, Financer Financer) {
		Financer existingFinancer = financerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Financer not found with id: " + id));

		if (!existingFinancer.getCode().equals(Financer.getCode()) &&
				financerRepository.existsByCode(Financer.getCode())) {
			throw new RuntimeException("Financer already exists with code: " + Financer.getCode());
		}

		existingFinancer.setCode(Financer.getCode());
		existingFinancer.setLabel(Financer.getLabel());
		existingFinancer.setFinancerTypeList(Financer.getFinancerTypeList());
		existingFinancer.setPopulation(Financer.getPopulation());
		return financerRepository.save(existingFinancer);
	}

	@Transactional
	public void deleteFinancer(Long id) {
		if (!financerRepository.existsById(id)) {
			throw new RuntimeException("Financer not found with id: " + id);
		}
		financerRepository.deleteById(id);
	}

	public record PricePerFinancer(Financer financer, Double price) {
	}
}