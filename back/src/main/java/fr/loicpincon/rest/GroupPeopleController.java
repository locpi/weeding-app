package fr.loicpincon.rest;

import fr.loicpincon.dao.v2.PeopleGroup;
import fr.loicpincon.service.GroupPeopleService;
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
@RequestMapping("/api/group-people")
@RequiredArgsConstructor
public class GroupPeopleController {


	private final GroupPeopleService service;

	@GetMapping
	public List<PeopleGroup> getAllOrganizerPeople() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<PeopleGroup> getOrganizerPeopleById(@PathVariable Long id) {
		PeopleGroup organizerPeople = service.findById(id);
		return organizerPeople != null ? ResponseEntity.ok(organizerPeople) : ResponseEntity.notFound().build();
	}

	@PostMapping
	public PeopleGroup createOrganizerPeople(@RequestBody PeopleGroup organizerPeople) {
		return service.save(organizerPeople);
	}

	@PutMapping("/{id}")
	public ResponseEntity<PeopleGroup> updateOrganizerPeople(@PathVariable Long id, @RequestBody PeopleGroup organizerPeople) {
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
	public ResponseEntity<PeopleGroup> getOrganizerPeopleByUuid(@PathVariable UUID uuid) {
		PeopleGroup organizerPeople = service.findByUuid(uuid);
		return organizerPeople != null ? ResponseEntity.ok(organizerPeople) : ResponseEntity.notFound().build();
	}
}