package fr.loicpincon.rest.dto;

import fr.loicpincon.model.WitnessType;
import lombok.Data;

@Data
public class UpdateGuestDto {
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private WitnessType witnessType;
	private Integer age;
	private Boolean isConfirmed;
}