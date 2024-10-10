package fr.loicpincon.dao.repo;

import fr.loicpincon.dao.CateringItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CateringRepository extends JpaRepository<CateringItem, Long> {
}