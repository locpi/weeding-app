package fr.loicpincon.dao.repo;
import fr.loicpincon.dao.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}