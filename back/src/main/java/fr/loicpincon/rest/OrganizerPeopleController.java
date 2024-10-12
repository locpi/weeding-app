package fr.loicpincon.rest;

import fr.loicpincon.dao.v2.OrganizerPeople;
import fr.loicpincon.service.OrganizerPeopleService;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("/api/organizer-people")
@RequiredArgsConstructor
public class OrganizerPeopleController {


	private final OrganizerPeopleService service;

	@GetMapping
	public List<OrganizerPeople> getAllOrganizerPeople() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<OrganizerPeople> getOrganizerPeopleById(@PathVariable Long id) {
		OrganizerPeople organizerPeople = service.findById(id);
		return organizerPeople != null ? ResponseEntity.ok(organizerPeople) : ResponseEntity.notFound().build();
	}

	@PostMapping
	public OrganizerPeople createOrganizerPeople(@RequestBody OrganizerPeople organizerPeople) {
		return service.save(organizerPeople);
	}

	@PutMapping("/{id}")
	public ResponseEntity<OrganizerPeople> updateOrganizerPeople(@PathVariable Long id, @RequestBody OrganizerPeople organizerPeople) {
		if (!id.equals(organizerPeople.getId())) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(service.save(organizerPeople));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteOrganizerPeople(@PathVariable Long id) {
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/uuid/{uuid}")
	public ResponseEntity<OrganizerPeople> getOrganizerPeopleByUuid(@PathVariable UUID uuid) {
		OrganizerPeople organizerPeople = service.findByUuid(uuid);
		return organizerPeople != null ? ResponseEntity.ok(organizerPeople) : ResponseEntity.notFound().build();
	}
}