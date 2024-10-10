package fr.loicpincon.rest;

import fr.loicpincon.dao.CateringItem;
import fr.loicpincon.dao.repo.CateringRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catering")
public class CateringController {
    @Autowired
    private CateringRepository cateringRepository;

    @GetMapping
    public List<CateringItem> getAllItems() {
        return cateringRepository.findAll();
    }

    @PostMapping
    public CateringItem addItem(@RequestBody CateringItem item) {
        return cateringRepository.save(item);
    }

    @PutMapping("/{id}")
    public CateringItem updateItem(@PathVariable Long id, @RequestBody CateringItem itemDetails) {
        CateringItem item = cateringRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catering item not found"));

        item.setName(itemDetails.getName());
        item.setDescription(itemDetails.getDescription());
        item.setAdultPrice(itemDetails.getAdultPrice());
        item.setChildPrice(itemDetails.getChildPrice());
        item.setAdultQuantity(itemDetails.getAdultQuantity());
        item.setChildQuantity(itemDetails.getChildQuantity());
        item.setCategory(itemDetails.getCategory());

        return cateringRepository.save(item);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        cateringRepository.deleteById(id);
    }
}