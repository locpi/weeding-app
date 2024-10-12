package fr.loicpincon.dao.repo;

import fr.loicpincon.dao.Guest;
import fr.loicpincon.model.GuestType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, Long> {
	int countByGuestType(GuestType type);

	int countByIsConfirmedTrue();

	List<Guest> findAllByPhoneIsNull();

	@Query("select distinct code from Guest ")
	List<String> findCode();


	@Query("select count(*) from Guest where code=:code and guestType = :g")
	int numberByCodeAndType(@Param("code") String code, @Param("g") GuestType guestType);

	@Query("select count(*) from Guest where code=:code")
	int numberByCode(@Param("code") String code);
}