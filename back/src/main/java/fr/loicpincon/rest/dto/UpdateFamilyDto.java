package fr.loicpincon.rest.dto;

import lombok.Data;

@Data
public class UpdateFamilyDto {
	private String name;
	private String address;
	private String postalCode;
	private String city;
}