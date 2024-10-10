package fr.loicpincon.rest;


import fr.loicpincon.dao.Family;
import fr.loicpincon.dao.Guest;
import fr.loicpincon.rest.dto.CreateFamilyDto;
import fr.loicpincon.rest.dto.CreateGuestDto;
import fr.loicpincon.rest.dto.GuestStatisticsDto;
import fr.loicpincon.rest.dto.UpdateFamilyDto;
import fr.loicpincon.rest.dto.UpdateGuestDto;
import fr.loicpincon.service.FamilyService;
import fr.loicpincon.service.GuestImportService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@RestController
@RequestMapping("/api")

public class GuestController {
    private final FamilyService familyService;
private final GuestImportService guestImportService;
    public GuestController(FamilyService familyService, final GuestImportService guestImportService) {
        this.familyService = familyService;
	    this.guestImportService = guestImportService;
    }



    @PatchMapping("/guests/{guestId}")
    public Guest updateGuest(
            @PathVariable Long guestId,@RequestBody Guest guest) {
    return familyService.updateGuest(guest);
    }
}