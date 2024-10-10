package fr.loicpincon.dao.repo;

import fr.loicpincon.dao.Guest;
import fr.loicpincon.model.GuestType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, Long> {
	int countByGuestType(GuestType type);
	int countByIsConfirmedTrue();

	List<Guest> findAllByPhoneIsNull();
}