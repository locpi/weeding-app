package fr.loicpincon.dao;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import org.hibernate.id.factory.spi.GenerationTypeStrategy;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Family {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String address;
	private String postalCode;
	private String city;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Guest> members = new ArrayList<>();
}
