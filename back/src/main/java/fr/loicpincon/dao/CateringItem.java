package fr.loicpincon.dao;

import fr.loicpincon.model.FinancerType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class CateringItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private double adultPrice;
    private double childPrice;
    private int adultQuantity;
    private int childQuantity;
    private String category;

    @Enumerated(EnumType.STRING)
    private FinancerType type;// ex: "Entrée", "Plat", "Dessert"

    public double getTotal(){
        if(category.equals("FIXE")){
            return adultPrice;
        }
        return adultPrice*adultQuantity+childPrice*childQuantity;
    }

}
