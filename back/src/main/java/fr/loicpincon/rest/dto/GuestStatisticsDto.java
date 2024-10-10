package fr.loicpincon.rest.dto;

import lombok.Data;

@Data
public class GuestStatisticsDto {
	private long totalGuests;
	private long totalAdults;
	private long totalChildren;
	private long confirmedGuests;
	private long totalFamilies;
}