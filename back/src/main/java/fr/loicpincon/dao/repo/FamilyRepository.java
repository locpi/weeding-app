package fr.loicpincon.dao.repo;

import fr.loicpincon.dao.Family;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyRepository extends JpaRepository<Family, Long> {
	List<Family> findByNameContainingIgnoreCase(String query);

	@Query("SELECT COUNT(DISTINCT f) FROM Family f")
	long countTotalFamilies();
}
