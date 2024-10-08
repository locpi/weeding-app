package fr.loicpincon.rest;



import fr.loicpincon.dao.Guest;
import fr.loicpincon.dao.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
@CrossOrigin(origins = "http://localhost:4200")
public class GuestController {
    @Autowired
    private GuestRepository guestRepository;

    @GetMapping
    public List<Guest> getAllGuests() {
        return guestRepository.findAll();
    }

    @PostMapping
    public Guest addGuest(@RequestBody Guest guest) {
        return guestRepository.save(guest);
    }

    @PutMapping("/{id}")
    public Guest updateGuest(@PathVariable Long id, @RequestBody Guest guestDetails) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Guest not found"));

        guest.setName(guestDetails.getName());
        guest.setEmail(guestDetails.getEmail());
        guest.setAttending(guestDetails.isAttending());
        guest.setPlusOnes(guestDetails.getPlusOnes());

        return guestRepository.save(guest);
    }

    @DeleteMapping("/{id}")
    public void deleteGuest(@PathVariable Long id) {
        guestRepository.deleteById(id);
    }
}