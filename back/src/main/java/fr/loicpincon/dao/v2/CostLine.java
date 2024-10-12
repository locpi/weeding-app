package fr.loicpincon.dao.v2;

import fr.loicpincon.model.CostObject;
import fr.loicpincon.model.CostPayment;
import fr.loicpincon.model.CostType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class CostLine {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String description;

	private double adultPrice;

	private double childPrice;

	private int adultQuantity;

	private int childQuantity;

	private double priceFixe;

	private String subName;

	@Enumerated(EnumType.STRING)
	private CostType type;

	@Enumerated(EnumType.STRING)
	private CostObject object;

	@ManyToMany(cascade = CascadeType.ALL)
	private List<TimeLine> timeLineList;

	@ManyToMany(cascade = CascadeType.ALL)
	private List<CostRepartition> repartition;

	@Enumerated(EnumType.STRING)
	private CostPayment paymentType;

	public double getTotal() {
		if (type == CostType.FIXE) {
			return priceFixe;
		}
		return adultPrice * adultQuantity + childPrice * childQuantity;
	}
}
