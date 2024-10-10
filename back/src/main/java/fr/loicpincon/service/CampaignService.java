package fr.loicpincon.service;

import fr.loicpincon.dao.Campaign;
import fr.loicpincon.dao.repo.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CampaignService {
	@Autowired
	private CampaignRepository campaignRepository;

	public Campaign createCampaign(Campaign campaign) {
		return campaignRepository.save(campaign);
	}

	public List<Campaign> getAllCampaigns() {
		return campaignRepository.findAll();
	}
}