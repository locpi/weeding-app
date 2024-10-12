package fr.loicpincon.dao.repo;

import fr.loicpincon.dao.v2.PeopleGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GroupPeopleRepository extends JpaRepository<PeopleGroup, Long> {
	PeopleGroup findByUuid(UUID uuid);
}