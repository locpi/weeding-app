package fr.loicpincon.rest.dto;

import lombok.Data;

@Data
public class GuestStatisticsDto {
	private int totalGuests;
	private int totalAdults;
	private int totalChildren;
	private int confirmedGuests;
	private int totalFamilies;
}