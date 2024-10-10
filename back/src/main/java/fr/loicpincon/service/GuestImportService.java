package fr.loicpincon.service;

import fr.loicpincon.dao.Family;
import fr.loicpincon.dao.Guest;
import fr.loicpincon.dao.repo.FamilyRepository;
import fr.loicpincon.dao.repo.GuestRepository;
import fr.loicpincon.model.GuestType;
import fr.loicpincon.model.WitnessType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GuestImportService {

	private final FamilyRepository familyRepository;
	private final GuestRepository guestRepository;

	record GuestProcess(String name,String lastname,String adresse,String tel,String leaveWith,int childNumber,String id,String type){}

	public GuestImportService(FamilyRepository familyRepository, GuestRepository guestRepository) {
		this.familyRepository = familyRepository;
		this.guestRepository = guestRepository;
	}

	@Transactional
	public void importGuestsFromCsv(Reader reader) throws Exception {
		CSVReader csvReader = new CSVReaderBuilder(reader)
				.withSkipLines(1) // Skip header
				.build();



		String[] line;

		List<GuestProcess> guestProcessList = new ArrayList<>();

		while ((line = csvReader.readNext()) != null) {
			int s=0;
			if(!line[8].equalsIgnoreCase("")) {
				 s = Integer.parseInt(line[8]);
			}
			guestProcessList.add(new GuestProcess(
					line[1],line[0],line[9],line[12],line[15],s,line[14],line[6]
			));
		}

		guestProcessList.forEach(item->{
			if(item.leaveWith.equals("")){
				final List<Guest> leaveWith = guestProcessList.stream().filter(f -> f.leaveWith.equals(item.id))
						.map(this::mapFRom)
						.toList();
				Family family = new Family();
				family.setAddress(item.adresse);
				family.setPostalCode("");
				family.setName("Famille "+item.lastname + " "+item.name);
				family.getMembers().add(mapFRom(item));
				family.getMembers().addAll(leaveWith);

				for(int i=0;i<item.childNumber;i++){
					final Guest guest = new Guest();
					guest.setAge(12);
					guest.setFirstName("Enfant");
					guest.setLastName((i+1)+"");
					guest.setGuestType(GuestType.CHILD);
					family.getMembers().add(guest);
				}

				familyRepository.save(family);

			}


		});


		csvReader.close();

	}

	private Guest mapFRom(GuestProcess g){
		Guest f = new Guest();
		f.setWitnessType(WitnessType.NONE);
		f.setLastName(g.lastname);
		f.setGuestType(GuestType.ADULT);
		f.setFirstName(g.name);
		return f;
	}

	private WitnessType parseWitnessType(String type) {
		if (type.equalsIgnoreCase("Mariée")) return WitnessType.BRIDE;
		if (type.equalsIgnoreCase("Marié")) return WitnessType.GROOM;
		return WitnessType.NONE;
	}

	private WitnessType parseFamilyType(String type) {
		if (type.equalsIgnoreCase("Mariée")) return WitnessType.BRIDE;
		if (type.equalsIgnoreCase("Marié")) return WitnessType.GROOM;
		return WitnessType.NONE;
	}
}