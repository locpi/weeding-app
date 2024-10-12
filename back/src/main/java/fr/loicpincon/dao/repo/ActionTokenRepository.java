package fr.loicpincon.dao.repo;

import fr.loicpincon.dao.v2.ActionToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ActionTokenRepository extends JpaRepository<ActionToken, UUID> {
}