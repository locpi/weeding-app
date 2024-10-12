package fr.loicpincon.rest;

import fr.loicpincon.dao.v2.CostLine;
import fr.loicpincon.service.CostLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cost-lines")
public class CostLineController {

	@Autowired
	private CostLineService service;

	@GetMapping
	public List<CostLine> getAllCostLines() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<CostLine> getCostLineById(@PathVariable Long id) {
		CostLine costLine = service.findById(id);
		return costLine != null ? ResponseEntity.ok(costLine) : ResponseEntity.notFound().build();
	}

	@PostMapping
	public CostLine createCostLine(@RequestBody CostLine costLine) {
		return service.save(costLine);
	}

	@PutMapping("/{id}")
	public ResponseEntity<CostLine> updateCostLine(@PathVariable Long id, @RequestBody CostLine costLine) {
		if (!id.equals(costLine.getId())) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(service.save(costLine));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCostLine(@PathVariable Long id) {
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}