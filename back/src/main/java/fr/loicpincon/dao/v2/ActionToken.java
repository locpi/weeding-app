package fr.loicpincon.dao.v2;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
public class ActionToken {
	@Id
	private UUID uuid;

	private boolean use;

	private LocalDateTime created;

	private LocalDateTime used;
}
