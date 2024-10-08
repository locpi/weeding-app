package fr.loicpincon.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
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
    private String category; // ex: "Entrée", "Plat", "Dessert"

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getAdultPrice() { return adultPrice; }
    public void setAdultPrice(double adultPrice) { this.adultPrice = adultPrice; }
    public double getChildPrice() { return childPrice; }
    public void setChildPrice(double childPrice) { this.childPrice = childPrice; }
    public int getAdultQuantity() { return adultQuantity; }
    public void setAdultQuantity(int adultQuantity) { this.adultQuantity = adultQuantity; }
    public int getChildQuantity() { return childQuantity; }
    public void setChildQuantity(int childQuantity) { this.childQuantity = childQuantity; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
