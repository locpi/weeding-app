package fr.loicpincon.rest;

import fr.loicpincon.dao.CateringItem;
import fr.loicpincon.dao.repo.CateringRepository;
import fr.loicpincon.rest.dto.GuestStatisticsDto;
import fr.loicpincon.service.FamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catering")
public class CostTypeController {
    @Autowired
    private CateringRepository cateringRepository;

    @Autowired
    private FamilyService familyService;

    @GetMapping
    public List<CateringItem> getAllItems() {
        return cateringRepository.findAll();
    }

    @PostMapping
    public CateringItem addItem(@RequestBody CateringItem item) {
        final GuestStatisticsDto guestStatistics = familyService.getGuestStatistics();
        item.setAdultQuantity(guestStatistics.getTotalAdults());
        item.setChildQuantity(guestStatistics.getTotalChildren());

        return cateringRepository.save(item);
    }

    @PutMapping("/{id}")
    public CateringItem updateItem(@PathVariable Long id, @RequestBody CateringItem itemDetails) {
        CateringItem item = cateringRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catering item not found"));
        final GuestStatisticsDto guestStatistics = familyService.getGuestStatistics();






        item.setName(itemDetails.getName());
        item.setDescription(itemDetails.getDescription());
        item.setAdultPrice(itemDetails.getAdultPrice());
        item.setChildPrice(itemDetails.getChildPrice());
        item.setChildQuantity(guestStatistics.getTotalChildren());
        item.setCategory(itemDetails.getCategory());
        item.setAdultQuantity(guestStatistics.getTotalAdults());

        return cateringRepository.save(item);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        cateringRepository.deleteById(id);
    }
}