package fr.loicpincon.dao.repo;

import fr.loicpincon.dao.v2.TimeLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TimeLineRepository extends JpaRepository<TimeLine, Long> {
	TimeLine findByUuid(UUID uuid);
}
