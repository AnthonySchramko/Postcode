package io.anthony.postcode.postcode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="postcode")
public class Postcode {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private Long id;
	
	@Column
	@Getter
	@Setter
	private String name;
	
	@Column
	@Getter
	@Setter
	private String postcode;
	
	@Column
	@Getter
	@Setter
	private String state;
	
	@Column
	@Getter
	@Setter
	private String lga;
	
	@Column
	@Getter
	@Setter
	private int population;
	
	public Postcode() {}
	
	public Postcode(Long id, String name, String postcode, String state, String lga, int population) {
		this.id=id;
		this.name=name;
		this.postcode=postcode;
		this.state=state;
		this.lga=lga;
		this.population=population;
	}
}
