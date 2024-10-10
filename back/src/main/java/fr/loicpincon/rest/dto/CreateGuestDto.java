package fr.loicpincon.rest.dto;

import fr.loicpincon.model.GuestType;
import fr.loicpincon.model.WitnessType;
import lombok.Data;

@Data
public class CreateGuestDto {
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private GuestType guestType;
	private WitnessType witnessType;
	private Integer age;
	private boolean isConfirmed;
}
