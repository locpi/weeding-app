package fr.loicpincon.dao.v2;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
public class TimeLine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String label;

	private UUID uuid;

	private LocalDateTime dueDate;

	private double total;

	private boolean paid;

	private LocalDateTime lastNotification;

	@OneToOne
	private CostLine cost;

}
