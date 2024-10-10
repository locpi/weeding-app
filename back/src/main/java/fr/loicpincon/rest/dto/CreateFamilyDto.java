package fr.loicpincon.rest.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateFamilyDto {
	private String name;
	private String address;
	private String postalCode;
	private String city;
	private List<CreateGuestDto> members;
}