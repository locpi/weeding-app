package fr.loicpincon.dao.repo;

import fr.loicpincon.dao.Financer;
import fr.loicpincon.dao.Guest;
import fr.loicpincon.model.GuestType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository

public interface FinancerRepository extends JpaRepository<Financer, Long> {
	Optional<Financer> findByCode(String code);
	boolean existsByCode(String code);}
