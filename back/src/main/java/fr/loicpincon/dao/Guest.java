package fr.loicpincon.dao;


import fr.loicpincon.model.FamilyType;
import fr.loicpincon.model.GuestType;
import fr.loicpincon.model.WitnessType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;

    @Enumerated(EnumType.STRING)
    private GuestType guestType;

    @Enumerated(EnumType.STRING)
    private WitnessType witnessType;

    @Enumerated(EnumType.STRING)
    private FamilyType familyType;

    private Integer age;
    private boolean isConfirmed;

    @OneToOne
    private Financer financer;

    private String code;



}