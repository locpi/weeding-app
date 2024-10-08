package fr.loicpincon.dao;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CateringRepository extends JpaRepository<CateringItem, Long> {
}