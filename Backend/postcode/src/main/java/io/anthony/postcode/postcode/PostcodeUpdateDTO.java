package io.anthony.postcode.postcode;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostcodeUpdateDTO {
	
	
	private String name;

	private String postcode;

	private String state;

	private String lga;

	private int population;

}
