package fr.loicpincon.rest;

import fr.loicpincon.dao.v2.TimeLine;
import fr.loicpincon.service.TimeLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/time-lines")
public class TimeLineController {

	@Autowired
	private TimeLineService service;

	@GetMapping
	public List<TimeLine> getAllTimeLines() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<TimeLine> getTimeLineById(@PathVariable Long id) {
		TimeLine timeLine = service.findById(id);
		return timeLine != null ? ResponseEntity.ok(timeLine) : ResponseEntity.notFound().build();
	}

	@PostMapping
	public TimeLine createTimeLine(@RequestBody TimeLine timeLine) {
		return service.save(timeLine);
	}

	@PutMapping("/{id}")
	public ResponseEntity<TimeLine> updateTimeLine(@PathVariable Long id, @RequestBody TimeLine timeLine) {
		if (!id.equals(timeLine.getId())) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(service.save(timeLine));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteTimeLine(@PathVariable Long id) {
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/uuid/{uuid}")
	public ResponseEntity<TimeLine> getTimeLineByUuid(@PathVariable UUID uuid) {
		TimeLine timeLine = service.findByUuid(uuid);
		return timeLine != null ? ResponseEntity.ok(timeLine) : ResponseEntity.notFound().build();
	}
}