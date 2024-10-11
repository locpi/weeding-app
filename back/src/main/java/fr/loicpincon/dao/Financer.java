package fr.loicpincon.dao;

import fr.loicpincon.model.FinancerType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Financer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String code;

	private String label;

	@ElementCollection(targetClass = FinancerType.class)
	@CollectionTable()
	@Enumerated(EnumType.STRING)
	private List<FinancerType> financerTypeList;

	@ElementCollection(targetClass = String.class)
	@CollectionTable()
	private List<String> population;
}
