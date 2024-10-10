package fr.loicpincon.rest;

import fr.loicpincon.dao.Campaign;
import fr.loicpincon.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "http://localhost:4200")

public class CampaignController {
	@Autowired
	private CampaignService campaignService;

	@PostMapping
	public ResponseEntity<Campaign> createCampaign(@RequestBody Campaign campaign) {
		Campaign createdCampaign = campaignService.createCampaign(campaign);
		return ResponseEntity.ok(createdCampaign);
	}

	@GetMapping
	public ResponseEntity<List<Campaign>> getAllCampaigns() {
		List<Campaign> campaigns = campaignService.getAllCampaigns();
		return ResponseEntity.ok(campaigns);
	}
}