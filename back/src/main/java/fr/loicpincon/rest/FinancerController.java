package fr.loicpincon.rest;

import fr.loicpincon.dao.Financer;
import fr.loicpincon.service.FinancerService;
import fr.loicpincon.service.PriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/financers")
@RequiredArgsConstructor
public class FinancerController {
	private final FinancerService financerService;
	private final PriceService priceService;

	@GetMapping
	public ResponseEntity<List<Financer>> getAllFinancers() {
		return ResponseEntity.ok(financerService.getAllFinancers());
	}

	@GetMapping("/price")
	public ResponseEntity<List<PriceService.Result>> result() {
		return ResponseEntity.ok(priceService.process());
	}

	@GetMapping("/price-stats")
	public ResponseEntity<List<FinancerService.PricePerFinancer>> resultBy() {
		return ResponseEntity.ok(financerService.priceBy());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Financer> getFinancerById(@PathVariable Long id) {
		return ResponseEntity.ok(financerService.getFinancerById(id));
	}

	@PostMapping
	public ResponseEntity<Financer> createFinancer(@RequestBody Financer financerDTO) {
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(financerService.createFinancer(financerDTO));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Financer> updateFinancer(
			@PathVariable Long id,
			 @RequestBody Financer financerDTO) {
		return ResponseEntity.ok(financerService.updateFinancer(id, financerDTO));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteFinancer(@PathVariable Long id) {
		financerService.deleteFinancer(id);
		return ResponseEntity.noContent().build();
	}
}
