package fr.loicpincon.service;

import fr.loicpincon.dao.CateringItem;
import fr.loicpincon.dao.repo.CateringRepository;
import fr.loicpincon.rest.dto.GuestStatisticsDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FoodService {

	private final FamilyService familyService;

	private final CateringRepository cateringRepository;


	public void sync(){
		final GuestStatisticsDto guestStatistics = familyService.getGuestStatistics();
		final List<CateringItem> list = cateringRepository.findAll().stream()
				.map(f -> {
					f.setChildQuantity(guestStatistics.getTotalChildren());
					f.setAdultQuantity(guestStatistics.getTotalAdults());
					return f;
				}).toList();
		cateringRepository.saveAll(list);
	}

}
