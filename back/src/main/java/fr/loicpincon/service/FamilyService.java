package fr.loicpincon.service;


import fr.loicpincon.dao.Family;
import fr.loicpincon.dao.Guest;
import fr.loicpincon.dao.repo.FamilyRepository;
import fr.loicpincon.dao.repo.GuestRepository;
import fr.loicpincon.model.GuestType;
import fr.loicpincon.rest.dto.CreateFamilyDto;
import fr.loicpincon.rest.dto.CreateGuestDto;
import fr.loicpincon.rest.dto.GuestStatisticsDto;
import fr.loicpincon.rest.dto.UpdateFamilyDto;
import fr.loicpincon.rest.dto.UpdateGuestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FamilyService {
	private final FamilyRepository familyRepository;
	private final GuestRepository guestRepository;

	public FamilyService(FamilyRepository familyRepository, GuestRepository guestRepository) {
		this.familyRepository = familyRepository;
		this.guestRepository = guestRepository;
	}

	public Page<Family> getFamilies(Pageable pageable) {
		return familyRepository.findAll(pageable);
	}

	public Family getFamilyById(Long id) {
		return familyRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Family not found"));
	}

	public Family createFamily(CreateFamilyDto dto) {
		Family family = new Family();
		family.setName(dto.getName());
		family.setAddress(dto.getAddress());
		family.setPostalCode(dto.getPostalCode());
		family.setCity(dto.getCity());

		List<Guest> members = dto.getMembers().stream()
				.map(memberDto -> {
					Guest guest = new Guest();
					guest.setFirstName(memberDto.getFirstName());
					guest.setLastName(memberDto.getLastName());
					guest.setEmail(memberDto.getEmail());
					guest.setPhone(memberDto.getPhone());
					guest.setGuestType(memberDto.getGuestType());
					guest.setWitnessType(memberDto.getWitnessType());
					guest.setAge(memberDto.getAge());
					guest.setConfirmed(memberDto.isConfirmed());
					return guest;
				})
				.collect(Collectors.toList());

		family.setMembers(members);
		return familyRepository.save(family);
	}

	public Family updateFamily(Long id, UpdateFamilyDto dto) {
		Family family = getFamilyById(id);
		if (dto.getName() != null) family.setName(dto.getName());
		if (dto.getAddress() != null) family.setAddress(dto.getAddress());
		if (dto.getPostalCode() != null) family.setPostalCode(dto.getPostalCode());
		if (dto.getCity() != null) family.setCity(dto.getCity());
		return familyRepository.save(family);
	}

	public void deleteFamily(Long id) {
		familyRepository.deleteById(id);
	}

	public Guest addGuestToFamily(Long familyId, CreateGuestDto dto) {
		Family family = getFamilyById(familyId);
		Guest guest = new Guest();
		guest.setFirstName(dto.getFirstName());
		guest.setLastName(dto.getLastName());
		guest.setEmail(dto.getEmail());
		guest.setPhone(dto.getPhone());
		guest.setGuestType(dto.getGuestType());
		guest.setWitnessType(dto.getWitnessType());
		guest.setAge(dto.getAge());
		guest.setConfirmed(dto.isConfirmed());

		family.getMembers().add(guest);
		familyRepository.save(family);
		return guest;
	}

	public Guest updateGuest(Guest guest) {
		Guest guestToUpdate = guestRepository.findById(guest.getId()).orElseThrow();

		if (guest.getFirstName() != null) guest.setFirstName(guest.getFirstName());
		if (guest.getLastName() != null) guest.setLastName(guest.getLastName());
		if (guest.getEmail() != null) guest.setEmail(guest.getEmail());
		if (guest.getPhone() != null) guest.setPhone(guest.getPhone());
		if (guest.getWitnessType() != null) guest.setWitnessType(guest.getWitnessType());
		if (guest.getAge() != null) guest.setAge(guest.getAge());
		guest.setConfirmed(guest.isConfirmed());

		return guestRepository.save(guest);
	}

	public GuestStatisticsDto getGuestStatistics() {
		GuestStatisticsDto stats = new GuestStatisticsDto();
		stats.setTotalGuests(guestRepository.count());
		stats.setTotalAdults(guestRepository.countByGuestType(GuestType.ADULT));
		stats.setTotalChildren(guestRepository.countByGuestType(GuestType.CHILD));
		stats.setConfirmedGuests(guestRepository.countByIsConfirmedTrue());
		stats.setTotalFamilies(familyRepository.countTotalFamilies());
		return stats;
	}

	public List<Family> searchFamilies(String query) {
		return familyRepository.findByNameContainingIgnoreCase(query);
	}

	public List<Guest> getGuestNoPhone() {
		return guestRepository.findAllByPhoneIsNull();
	}
}