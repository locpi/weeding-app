package fr.loicpincon.dao.repo;

import fr.loicpincon.dao.v2.TimeLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface TimeLineRepository extends JpaRepository<TimeLine, Long> {
	TimeLine findByUuid(UUID uuid);

	List<TimeLine> findAllByDueDateIsBetween(LocalDateTime begin, LocalDateTime end);
}
