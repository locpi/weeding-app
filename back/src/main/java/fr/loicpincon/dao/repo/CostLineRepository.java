package fr.loicpincon.dao.repo;

import fr.loicpincon.dao.v2.CostLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CostLineRepository extends JpaRepository<CostLine, Long> {
}
