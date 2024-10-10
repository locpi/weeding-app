package fr.loicpincon.rest;


import com.opencsv.CSVReader;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")

public class FamilyController {
    private final FamilyService familyService;
private final GuestImportService guestImportService;
    public FamilyController(FamilyService familyService, final GuestImportService guestImportService) {
        this.familyService = familyService;
	    this.guestImportService = guestImportService;
    }

    @GetMapping("/families")
    public ResponseEntity<Page<Family>> getFamilies(Pageable pageable) {
        return ResponseEntity.ok(familyService.getFamilies(pageable));
    }

    @GetMapping("/families/{id}")
    public ResponseEntity<Family> getFamilyById(@PathVariable Long id) {
        return ResponseEntity.ok(familyService.getFamilyById(id));
    }

    @PostMapping("/families")
    public ResponseEntity<Family> createFamily(@RequestBody CreateFamilyDto createFamilyDto) {
        return ResponseEntity.ok(familyService.createFamily(createFamilyDto));
    }

    @PatchMapping("/families/{id}")
    public ResponseEntity<Family> updateFamily(@PathVariable Long id, @RequestBody UpdateFamilyDto updateFamilyDto) {
        return ResponseEntity.ok(familyService.updateFamily(id, updateFamilyDto));
    }

    @DeleteMapping("/families/{id}")
    public ResponseEntity<Void> deleteFamily(@PathVariable Long id) {
        familyService.deleteFamily(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/families/{familyId}/guests")
    public ResponseEntity<Guest> addGuestToFamily(@PathVariable Long familyId, @RequestBody CreateGuestDto guestDto) {
        return ResponseEntity.ok(familyService.addGuestToFamily(familyId, guestDto));
    }



    @GetMapping("/statistics")
    public ResponseEntity<GuestStatisticsDto> getGuestStatistics() {
        return ResponseEntity.ok(familyService.getGuestStatistics());
    }

    @GetMapping("/guest/no-phone")
    public ResponseEntity<List<Guest>> getGuestNoPhone() {
        return ResponseEntity.ok(familyService.getGuestNoPhone());
    }


    @GetMapping("/families/search")
    public ResponseEntity<List<Family>> searchFamilies(@RequestParam String q) {
        return ResponseEntity.ok(familyService.searchFamilies(q));
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCsvFile(@RequestParam("file") MultipartFile file) {
        try {
            final Reader strings = new InputStreamReader(file.getInputStream());
            guestImportService.importGuestsFromCsv(strings);
            return new ResponseEntity<>("File processed successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to process file: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}