package fr.loicpincon.dao.repo;

import fr.loicpincon.dao.v2.OrganizerPeople;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrganizerPeopleRepository extends JpaRepository<OrganizerPeople, Long> {
	OrganizerPeople findByUuid(UUID uuid);
}