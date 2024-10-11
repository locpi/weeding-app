package fr.loicpincon.service;

import fr.loicpincon.dao.Financer;
import fr.loicpincon.dao.Guest;
import fr.loicpincon.dao.repo.CampaignRepository;
import fr.loicpincon.dao.repo.CateringRepository;
import fr.loicpincon.dao.repo.FinancerRepository;
import fr.loicpincon.dao.repo.GuestRepository;
import fr.loicpincon.model.GuestType;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PriceService {

	private final GuestRepository guestRepository;


	record Test(int adult,int child){}

	private final CateringRepository cateringRepository;

	public record Result(String code,double priceFood){}

	public List<Result> process(){
		Map<String, Test> bla = new HashMap<>();
		Map<String, Double> prices = new HashMap<>();
		final List<Guest> all = guestRepository.findAll();
		guestRepository.findCode().forEach(c->{
			final int adult = guestRepository.numberByCodeAndType(c, GuestType.ADULT);
			final int child = guestRepository.numberByCodeAndType(c, GuestType.CHILD);
			bla.put(c,new Test(adult,child));
			prices.put(c,0.0);
		});
		final List<CodePercentage> codePercentages = calculateCodeDistribution(all);
		cateringRepository.findAll().forEach(c->{
			if(c.getCategory().equals("FIXE")){
				bla.forEach((key,value)->{
					Double actualPrice = prices.get(key);

					final CodePercentage codePercentage = codePercentages.stream().filter(f -> f.getCode().equals(key)).findFirst().get();

					double price = codePercentage.percentage*c.getTotal()/100;

					prices.put(key, actualPrice+price);
				});
			}else{
				final double adultPrice = c.getAdultPrice();
				final double childPrice = c.getChildPrice();

				bla.forEach((key,value)->{
					Double actualPrice = prices.get(key);
					Double adult = adultPrice * value.adult();
					Double child  = childPrice * value.child();
					prices.put(key,actualPrice + adult + child);
				});
			}

		});


		List<Result> results = new ArrayList<>();
		prices.forEach((key,value)->{
			results.add(new Result(key,value));
		});
return results;

	}

	@PostConstruct
	public void init(){
		this.process();
	}

	public static List<CodePercentage> calculateCodeDistribution(List<Guest> items) {
		if (items == null || items.isEmpty()) {
			return List.of();
		}

		// Compte le nombre d'occurrences de chaque code
		Map<String, Long> codeCounts = items.stream()
				.collect(Collectors.groupingBy(
						Guest::getCode,
						Collectors.counting()
				));

		int totalItems = items.size();

		// Calcule le pourcentage pour chaque code
		return codeCounts.entrySet().stream()
				.map(entry -> {
					String code = entry.getKey();
					long count = entry.getValue();
					double percentage = (count * 100.0) / totalItems;
					return new CodePercentage(code, percentage, count);
				})
				.sorted((cp1, cp2) -> Double.compare(cp2.getPercentage(), cp1.getPercentage()))
				.collect(Collectors.toList());
	}

	@Data
	@AllArgsConstructor
	public static class CodePercentage {
		private String code;
		private double percentage;
		private long count;
	}
}
