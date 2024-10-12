package fr.loicpincon.service;

import fr.loicpincon.dao.repo.CostLineRepository;
import fr.loicpincon.dao.repo.OrganizerPeopleRepository;
import fr.loicpincon.dao.v2.CostLine;
import fr.loicpincon.dao.v2.OrganizerPeople;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PriceService {

	private final CostCalculator costCalculator;

	private final OrganizerPeopleRepository organizerPeopleRepository;

	private final CostLineRepository costLineRepository;


	public List<Result> process() {
		final List<CostLine> all = costLineRepository.findAll();
		return organizerPeopleRepository.findAll()
				.stream()
				.map(f -> {
					double total = 0.0;
					for (CostLine c : all) {

						total += costCalculator.calculateCostPerOrganizer(c, f);
					}
					return new Result(f, total);
				}).toList();

	}


	public record Result(OrganizerPeople people, double priceFood) {
	}

	@Data
	@AllArgsConstructor
	public static class CodePercentage {
		private String code;

		private double percentage;

		private long count;
	}
}
